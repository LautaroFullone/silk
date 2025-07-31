import { useEffect, useRef, useCallback } from 'react'
import EditorJS, { type OutputData } from '@editorjs/editorjs'
import Header from '@editorjs/header'
import List from '@editorjs/list'
import Paragraph from '@editorjs/paragraph'
import Image from '@editorjs/image'
import Quote from '@editorjs/quote'
import Delimiter from '@editorjs/delimiter'
import Table from '@editorjs/table'
import Link from '@editorjs/link'
import Embed from '@editorjs/embed'

interface EditorJSProps {
   data?: OutputData
   onChange: (data: OutputData) => void
   placeholder?: string
}

const TextEditor: React.FC<EditorJSProps> = ({ data, onChange }) => {
   const editorRef = useRef<EditorJS | null>(null)
   const holderRef = useRef<HTMLDivElement>(null)

   const initializeEditor = useCallback(() => {
      if (!holderRef.current) return

      const editor = new EditorJS({
         holder: holderRef.current,
         placeholder: 'Escribi tu contenido aca...',
         data: data || {
            blocks: [
               {
                  type: 'paragraph',
                  data: {
                     text: '',
                  },
               },
            ],
         },
         tools: {
            header: {
               class: Header,
               config: {
                  placeholder: 'Escribe un título...',
                  levels: [1, 2, 3, 4],
                  defaultLevel: 2,
               },
            },
            paragraph: {
               class: Paragraph,
               inlineToolbar: true,
               config: {
                  placeholder: 'Escribe tu contenido...',
               },
            },
            list: {
               class: List,
               inlineToolbar: true,
               config: {
                  defaultStyle: 'unordered',
               },
            },
            image: {
               class: Image,
               config: {
                  endpoints: {
                     byFile: '/api/upload', // Endpoint para subir archivos
                     byUrl: '/api/upload-by-url', // Endpoint para subir por URL
                  },
                  field: 'image',
                  types: 'image/*',
                  additionalRequestHeaders: {
                     'Content-Type': 'multipart/form-data',
                  },
               },
            },
            linkTool: {
               class: Link,
               config: {
                  endpoint: '/api/link-preview', // Endpoint para preview de links
               },
            },
            quote: {
               class: Quote,
               inlineToolbar: true,
               config: {
                  quotePlaceholder: 'Escribe una cita...',
                  captionPlaceholder: 'Autor de la cita',
               },
            },
            delimiter: Delimiter,
            embed: {
               class: Embed,
               config: {
                  services: {
                     youtube: true,
                     coub: true,
                     codepen: true,
                     instagram: true,
                     twitter: true,
                     height: 315,
                     width: 560,
                  },
               },
            },
            table: {
               class: Table,
               inlineToolbar: true,
               config: {
                  rows: 2,
                  cols: 3,
               },
            },
         },
         onChange: async () => {
            if (editorRef.current) {
               try {
                  const outputData = await editorRef.current.save()
                  onChange(outputData)
               } catch (error) {
                  console.error('Error saving editor data:', error)
               }
            }
         },
         minHeight: 300,
      })

      editorRef.current = editor
   }, [data, onChange])

   useEffect(() => {
      if (typeof window !== 'undefined') {
         initializeEditor()
      }

      return () => {
         if (editorRef.current && typeof editorRef.current.destroy === 'function') {
            editorRef.current.destroy()
            editorRef.current = null
         }
      }
   }, [initializeEditor])

   return (
      <div className="border rounded-lg overflow-hidden bg-white">
         <div
            ref={holderRef}
            className="min-h-[400px] p-4 prose prose-lg max-w-none focus-within:outline-none"
            style={{
               fontSize: '16px',
               lineHeight: '1.6',
            }}
         />
      </div>
   )
}

export default TextEditor

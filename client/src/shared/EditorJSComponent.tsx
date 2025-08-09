/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react'
import EditorJS, { type OutputData } from '@editorjs/editorjs'
import Header from '@editorjs/header'

interface EditorJSProps {
   data?: OutputData
   onChange: (data: OutputData) => void
   placeholder?: string
}

export function EditorJSComponent({
   onChange,
   placeholder = 'Comenzá a escribir tu post...',
}: EditorJSProps) {
   const editorRef = useRef<EditorJS | null>(null)
   const holderRef = useRef<HTMLDivElement>(null)

   const [isFocused, setIsFocused] = useState(false)

   useEffect(() => {
      if (!holderRef.current) return

      const editor = new EditorJS({
         holder: holderRef.current,
         placeholder,
         data: {
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
               class: Header as any,
               config: {
                  placeholder: 'Escribe un título...',
                  levels: [1, 2, 3, 4],
                  defaultLevel: 2,
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
         minHeight: 200,
      })

      editorRef.current = editor

      return () => {
         if (editorRef.current && typeof editorRef.current.destroy === 'function') {
            editorRef.current.destroy()
            editorRef.current = null
         }
      }
   }, [])

   return (
      <div
         className={`border border-input rounded-md shadow-xs overflow-hidden bg-white transition-all 
            ${isFocused ? 'border-ring ring-3 ring-ring/50' : ''}`}
      >
         <div
            ref={holderRef}
            className="p-4 "
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={{
               fontSize: '16px',
               lineHeight: '1.6',
            }}
         />
      </div>
   )
}

import { OutputData } from '@editorjs/editorjs'

export interface Post {
   id: string
   title: string
   date: string
   author: string
   description: string
   image: string
   content: OutputData | string
   isVisible: boolean
   category: string
}

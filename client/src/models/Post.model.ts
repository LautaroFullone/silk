import { Block } from '@blocknote/core'

export interface Post {
   id: string
   title: string
   date: string
   author: string
   description: string
   imageFilePath?: string
   content: Block[] | string
   isActive: boolean
   category: string
}

export interface PostFormData {
   title: string
   author: string
   date: string
   description: string
   category: string
   content: Block[]
   isActive: boolean
   imageFile?: File
}

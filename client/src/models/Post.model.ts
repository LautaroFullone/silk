import { Block } from '@blocknote/core'

export interface PostCategory {
   id: string
   name: string
}
export interface Post {
   id: string
   title: string
   author: string
   date: string
   description: string
   content: Block[] | string
   isActive: boolean
   imageFilePath?: string
   category: PostCategory
}

export interface PostFormData {
   title: string
   author: string
   date: string
   description: string
   categoryName: string
   content: Block[]
   isActive: boolean
   imageFile?: File
}

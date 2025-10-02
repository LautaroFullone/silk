import { PostFormData } from '@models/Post.model'
import { ResponseApi } from './ResponseApi'
import { api } from '@lib/axios'

/**
 * Obtener todos los posts del sistema
 * @returns Mensaje de éxito y datos de los posts
 */
export async function getPosts() {
   type Response = Pick<ResponseApi, 'posts'>
   const { data } = await api.get<Response>(`/posts`)
   return data
}

/**
 * Obtener un post por ID
 * @param postId ID del post a obtener
 * @returns Datos del post
 */
export async function getPostById(postId: string) {
   type Response = Pick<ResponseApi, 'message' | 'post'>
   const { data } = await api.get<Response>(`/posts/${postId}`)
   return data
}

/**
 * Crear un nuevo post
 * @param postData Datos del post a crear
 * @returns Mensaje de éxito y datos del post creado
 */
export async function createPost(postData: PostFormData) {
   type Response = Pick<ResponseApi, 'message' | 'post'>
   const form = new FormData()
   form.append('personName', postData.personName)
   form.append('personRole', postData.personRole)
   form.append('description', postData.description)
   form.append('isHighlight', String(postData.isHighlight))
   form.append('isActive', String(postData.isActive))

   if (postData.avatarFile) form.append('avatarFile', postData.avatarFile)

   const { data } = await api.post<Response>(`/posts`, form)
   return data
}

/**
 * Actualizar un post existente
 * @param postId ID del post a actualizar
 * @param postData Datos del post a actualizar
 * @returns Mensaje de éxito y datos del post actualizado
 */
export async function updatePost({
   postId,
   postData,
}: {
   postId: string
   postData: Partial<PostFormData>
}) {
   type Response = Pick<ResponseApi, 'message' | 'post'>

   const form = new FormData()

   // Solo agregar campos que realmente tienen un valor para actualizar
   if (postData.personName !== undefined) {
      form.append('personName', postData.personName)
   }
   if (postData.personRole !== undefined) {
      form.append('personRole', postData.personRole)
   }
   if (postData.description !== undefined) {
      form.append('description', postData.description)
   }
   // Para booleanos, verificar que la propiedad exista en el objeto (no solo que no sea undefined)
   if (postData.isHighlight !== undefined) {
      form.append('isHighlight', String(postData.isHighlight))
   }
   if (postData.isActive !== undefined) {
      form.append('isActive', String(postData.isActive))
   }
   if (postData.avatarFile) {
      form.append('avatarFile', postData.avatarFile)
   }

   const { data } = await api.patch<Response>(`/posts/${postId}`, form)
   return data
}

/**
 * Eliminar un post del sistema
 * @param postId ID del post a eliminar
 * @returns Mensaje de éxito y datos del post eliminado
 */
export async function deletePost(postId: string) {
   type Response = Pick<ResponseApi, 'message' | 'post'>
   const { data } = await api.delete<Response>(`/posts/${postId}`)
   return data
}

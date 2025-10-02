import { PageTitle, InputForm, TextAreaForm, CheckboxForm, ActionButton } from '@shared'
import { useCreatePost, useFetchPost, useUpdatePost } from '@hooks/react-query'
import { PostFormData } from '@models/Post.model'
import { Save, Upload, X } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import {
   Button,
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
   Input,
   Label,
} from '@shadcn'

const initialFormData: PostFormData = {
   title: '',
   author: '',
   date: new Date().toISOString().split('T')[0], // Fecha actual por defecto
   description: '',
   content: [],
   category: '',
   isActive: false,
   imageFile: undefined,
}

//import '@blocknote/core/fonts/inter.css'
import { BlockNoteView } from '@blocknote/mantine'
import '@blocknote/mantine/style.css'
import { useCreateBlockNote } from '@blocknote/react'

const PostForm = () => {
   const { postId } = useParams()
   const isEdit = Boolean(postId)
   const editor = useCreateBlockNote()

   const { createPostMutate, isPending: isCreatePostPending } = useCreatePost()
   const { updatePostMutate, isPending: isUpdatePostPending } = useUpdatePost()

   // Obtener post en modo edición
   const { post: postToEdit, isLoading: isLoadingPost } = useFetchPost({
      postId: isEdit ? postId : undefined,
   })

   const {
      watch,
      setValue,
      register,
      reset,
      handleSubmit,
      formState: { errors, isDirty },
   } = useForm<PostFormData>({
      mode: 'onChange',
      reValidateMode: 'onChange',
      defaultValues: initialFormData,
   })

   const imageFile = watch('imageFile')

   // Cargar datos del post en modo edición
   useEffect(() => {
      if (isEdit && postToEdit) {
         setValue('title', postToEdit.title)
         setValue('author', postToEdit.author)
         setValue('date', postToEdit.date)
         setValue('description', postToEdit.description)
         setValue('category', postToEdit.category)
         setValue('isActive', postToEdit.isActive)

         // Si el contenido es string (HTML), crear un bloque simple
         if (typeof postToEdit.content === 'string') {
            // Crear un bloque simple para contenido texto
            setValue('content', [])
         } else if (Array.isArray(postToEdit.content)) {
            // Ya es un array de blocks de BlockNote
            setValue('content', postToEdit.content)
         }
      }

      return () => {
         reset(initialFormData)
      }
   }, [postToEdit, isEdit, setValue, reset])

   const handleSavePost = async (formData: PostFormData) => {
      if (isEdit && postId && postToEdit) {
         await updatePostMutate({ postId, postData: formData })
      } else {
         await createPostMutate(formData)
         reset()
      }
   }

   // En modo creación se habilita al inicio y se deshabilita solo después del primer submit con errores, en edición se habilita solo si hay cambios
   const isButtonEnabled = isEdit ? isDirty : !Object.keys(errors).length
   const isMutationPending = isCreatePostPending || isUpdatePostPending

   return (
      <>
         <div className="flex justify-between gap-2">
            <PageTitle
               title={isEdit ? 'Editar Post' : 'Crear Nuevo Post'}
               hasGoBack
               goBackRoute="ADMIN_POST_LIST"
               description={
                  isEdit
                     ? 'Actualiza la información del post'
                     : 'Ingresá el contenido del post'
               }
            />

            <ActionButton
               size="lg"
               icon={Save}
               variant="primary"
               label={isEdit ? 'Guardar Cambios' : 'Guardar Post'}
               className="hidden md:flex"
               isLoading={isMutationPending}
               disabled={!isButtonEnabled || isLoadingPost}
               onClick={handleSubmit(handleSavePost)}
            />
         </div>

         {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-6"> */}
         <div className="grid grid-cols-1 gap-6">
            {/* Columna Izquierda */}
            <div className="lg:col-span-2">
               <Card>
                  <CardHeader>
                     <CardTitle>Información General</CardTitle>
                     <CardDescription>Detalle completo del post</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <InputForm
                           type="text"
                           name="title"
                           label="Título"
                           placeholder="Título del post"
                           isLoading={isLoadingPost}
                           register={register('title', {
                              required: 'El título es obligatorio',
                              maxLength: {
                                 value: 100,
                                 message: 'El título no puede superar los 100 caracteres',
                              },
                           })}
                           errors={errors}
                        />

                        <InputForm
                           type="text"
                           name="author"
                           label="Autor"
                           placeholder="Nombre del autor"
                           isLoading={isLoadingPost}
                           register={register('author', {
                              required: 'El autor es obligatorio',
                              maxLength: {
                                 value: 50,
                                 message: 'El autor no puede superar los 50 caracteres',
                              },
                              pattern: {
                                 value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                                 message:
                                    'El autor solo puede contener letras y espacios',
                              },
                           })}
                           errors={errors}
                        />
                     </div>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <InputForm
                           type="date"
                           name="date"
                           label="Fecha"
                           isLoading={isLoadingPost}
                           register={register('date', {
                              required: 'La fecha es obligatoria',
                           })}
                           errors={errors}
                        />

                        <InputForm
                           type="text"
                           name="category"
                           label="Categoría"
                           placeholder="Categoría del post"
                           isLoading={isLoadingPost}
                           register={register('category', {
                              required: 'La categoría es obligatoria',
                              maxLength: {
                                 value: 50,
                                 message:
                                    'La categoría no puede superar los 50 caracteres',
                              },
                           })}
                           errors={errors}
                        />
                     </div>

                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
                        <div className="space-y-1">
                           <Label htmlFor="imageFile">Imagen del Post</Label>

                           <div className="flex">
                              <Input
                                 id="imageFile"
                                 readOnly
                                 value={imageFile ? imageFile.name : ''}
                                 placeholder="Seleccioná una imagen..."
                                 className="rounded-r-none border-r-0 bg-gray-50"
                              />

                              <div className="relative cursor-pointer">
                                 <input
                                    type="file"
                                    id="imageFile"
                                    accept="image/*"
                                    disabled={isLoadingPost}
                                    onChange={(e) => {
                                       const file = e.target.files?.[0]
                                       // Validaciones básicas
                                       if (file) {
                                          const allowed = [
                                             'image/jpeg',
                                             'image/jpg',
                                             'image/png',
                                             'image/webp',
                                          ]
                                          if (!allowed.includes(file.type)) {
                                             // opcional: mostrar toast/error
                                             return
                                          }
                                          if (file.size > 3 * 1024 * 1024) {
                                             // opcional: mostrar toast/error
                                             return
                                          }
                                       }
                                       setValue('imageFile', file || undefined, {
                                          shouldDirty: true,
                                          shouldValidate: true,
                                       })
                                    }}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                 />

                                 <Button
                                    type="button"
                                    variant="outline"
                                    disabled={isLoadingPost}
                                    className="rounded-l-none border-l-0 px-3 h-full bg-transparent cursor-pointer"
                                    asChild
                                 >
                                    <label
                                       htmlFor="imageFile"
                                       className="flex items-center cursor-pointer"
                                    >
                                       <Upload className="w-4 h-4 cursor-pointer" />
                                    </label>
                                 </Button>
                              </div>
                           </div>

                           <p className="text-xs text-gray-500">
                              Formatos: JPG, PNG o WEBP (máx. 3MB)
                           </p>

                           {imageFile && (
                              <Button
                                 type="button"
                                 variant="ghost"
                                 size="sm"
                                 className="px-0 text-red-600"
                                 onClick={() =>
                                    setValue('imageFile', undefined, {
                                       shouldDirty: true,
                                    })
                                 }
                              >
                                 <X className="w-4 h-4 mr-1" />
                                 Quitar imagen
                              </Button>
                           )}
                        </div>

                        <CheckboxForm
                           name="isActive"
                           label="Mostrar en la web"
                           description="Habilita que el post aparezca en la landing page."
                           value={watch('isActive') || false}
                           isLoading={isLoadingPost}
                           onChange={(val) =>
                              setValue('isActive', val, {
                                 shouldValidate: true,
                                 shouldDirty: true,
                              })
                           }
                           errors={errors}
                        />
                     </div>

                     <TextAreaForm
                        name="description"
                        label="Descripción"
                        placeholder="Breve descripción del post"
                        isLoading={isLoadingPost}
                        register={register('description', {
                           required: 'La descripción es obligatoria',
                           maxLength: {
                              value: 300,
                              message:
                                 'La descripción no puede superar los 300 caracteres',
                           },
                        })}
                        errors={errors}
                     />
                     <div className="space-y-2">
                        <Label htmlFor="content">Contenido</Label>

                        {/* <BlockNoteEditor
                           value={watch('content')}
                           onChange={handleEditorChange}
                           placeholder="Edita el contenido de tu post..."
                        /> */}
                        <BlockNoteView editor={editor} />
                     </div>
                  </CardContent>
               </Card>
            </div>

            {/* Columna Derecha */}
            {/* <div className="space-y-6">
               <Card>
                  <CardHeader>
                     <CardTitle>Vista Previa</CardTitle>
                  </CardHeader>

                  <CardContent>
                     <div className="space-y-2">
                        <div className="aspect-video bg-gray-200 rounded-md overflow-hidden">
                           {previewUrl ? (
                              <img
                                 src={previewUrl}
                                 alt="Preview"
                                 className="w-full h-full object-cover"
                              />
                           ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-500">
                                 Sin imagen
                              </div>
                           )}
                        </div>
                        <h3 className="text-lg font-serif text-silk-secondary">
                           {watch('title') || 'Título del post'}
                        </h3>

                        <p className="text-sm text-gray-600">
                           Por {watch('author') || 'Autor'} -{' '}
                           {watch('category') || 'Categoría'}
                        </p>

                        <p className="text-sm text-gray-600">
                           {watch('description') || 'Descripción del post...'}
                        </p>
                     </div>
                  </CardContent>
               </Card>
            </div> */}

            <ActionButton
               size="lg"
               icon={Save}
               variant="primary"
               label={isEdit ? 'Guardar Cambios' : 'Guardar Post'}
               className="md:hidden"
               isLoading={isMutationPending}
               disabled={!isButtonEnabled || isLoadingPost}
               onClick={handleSubmit(handleSavePost)}
            />
         </div>
      </>
   )
}

export default PostForm

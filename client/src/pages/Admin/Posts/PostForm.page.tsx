import { PageTitle, InputForm, TextAreaForm, CheckboxForm, ActionButton } from '@shared'
import { useCreatePost, useFetchPost, useUpdatePost } from '@hooks/react-query'
import { Save, Trash2, Upload } from 'lucide-react'
import { PostFormData } from '@models/Post.model'
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
   cn,
   Input,
   Label,
   Skeleton,
} from '@shadcn'

// import '@blocknote/core/fonts/inter.css'
import { BlockNoteView } from '@blocknote/mantine'
import '@blocknote/mantine/style.css'
import { useCreateBlockNote } from '@blocknote/react'
import { es } from '@blocknote/core/locales'

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
const PostForm = () => {
   const { postId } = useParams()
   const isEdit = Boolean(postId)
   const editor = useCreateBlockNote({ dictionary: es })

   const { createPostMutate, isPending: isCreatePostPending } = useCreatePost()
   const { updatePostMutate, isPending: isUpdatePostPending } = useUpdatePost()
   const { post: postToEdit, isLoading: isLoadingPost } = useFetchPost({
      postId,
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

         // Cargar contenido en el editor BlockNote
         if (typeof postToEdit.content === 'string') {
            // Si el contenido es string (HTML), crear un bloque simple
            setValue('content', [])
            // Para contenido HTML, podrías convertirlo a bloques aquí si es necesario
         } else if (Array.isArray(postToEdit.content) && postToEdit.content.length > 0) {
            // Ya es un array de blocks de BlockNote, cargar en el editor
            setValue('content', postToEdit.content)
            editor.replaceBlocks(editor.document, postToEdit.content)
         }
      }

      return () => {
         reset(initialFormData)
      }
   }, [postToEdit, isEdit, setValue, reset, editor])

   const handleSavePost = async (formData: PostFormData) => {
      const completeFormData = {
         ...formData,
         content: editor.document,
      }

      if (isEdit && postId && postToEdit) {
         await updatePostMutate({ postId, postData: completeFormData })
      } else {
         await createPostMutate(completeFormData)
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

         <div className="grid grid-cols-1 gap-6">
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
                           placeholder="Ej: Tendencias en colores"
                           isLoading={isLoadingPost}
                           disabled={isMutationPending}
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
                           placeholder="Ej: Germán Beder"
                           isLoading={isLoadingPost}
                           disabled={isMutationPending}
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
                           disabled={isMutationPending}
                           register={register('date', {
                              required: 'La fecha es obligatoria',
                           })}
                           errors={errors}
                        />

                        <InputForm
                           type="text"
                           name="category"
                           label="Categoría"
                           placeholder="Ej: Moda"
                           isLoading={isLoadingPost}
                           disabled={isMutationPending}
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

                     <div className="space-y-1">
                        <Label htmlFor="imageFile">Imagen del Post</Label>

                        {isLoadingPost ? (
                           <Skeleton className="w-full h-9" />
                        ) : (
                           <>
                              <div className="flex">
                                 <Input
                                    readOnly
                                    id="imageFile"
                                    disabled={isMutationPending}
                                    value={imageFile ? imageFile.name : ''}
                                    placeholder="Seleccioná una imagen..."
                                    className="rounded-r-none border-r-0 "
                                 />

                                 <div className="relative cursor-pointer">
                                    <input
                                       type="file"
                                       id="imageFile"
                                       accept="image/*"
                                       disabled={isMutationPending}
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
                                       asChild
                                       type="button"
                                       variant="outline"
                                       disabled={isMutationPending}
                                       className="rounded-l-none border-l-0 px-3 h-full cursor-pointer shadow-none"
                                    >
                                       <label
                                          htmlFor="imageFile"
                                          className="flex items-center cursor-pointer"
                                       >
                                          <Upload className="w-4 h-4 cursor-pointer" />
                                       </label>
                                    </Button>
                                 </div>

                                 {imageFile && (
                                    <div className="flex items-center">
                                       <Button
                                          size="sm"
                                          variant="ghost"
                                          className="text-destructive! ml-4"
                                          onClick={() =>
                                             setValue('imageFile', undefined, {
                                                shouldDirty: true,
                                                shouldValidate: true,
                                             })
                                          }
                                       >
                                          <Trash2 className="size-4" />
                                          Quitar imagen
                                       </Button>
                                    </div>
                                 )}
                              </div>

                              <p className="text-xs text-gray-500">
                                 Formatos: JPG, PNG o WEBP (máx. 3MB)
                              </p>
                           </>
                        )}
                     </div>

                     <TextAreaForm
                        name="description"
                        label="Descripción"
                        isLoading={isLoadingPost}
                        disabled={isMutationPending}
                        placeholder="Ej: Descubrí los colores que potencian tu presencia."
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

                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <CheckboxForm
                           name="isActive"
                           label="Mostrar en la web"
                           description="Habilita que el post aparezca en la landing page."
                           value={watch('isActive') || false}
                           isLoading={isLoadingPost}
                           disabled={isMutationPending}
                           onChange={(val) =>
                              setValue('isActive', val, {
                                 shouldValidate: true,
                                 shouldDirty: true,
                              })
                           }
                           errors={errors}
                        />
                     </div>

                     <div className="space-y-1">
                        <Label htmlFor="content">Contenido</Label>

                        {isLoadingPost ? (
                           <Skeleton className="w-full h-32" />
                        ) : (
                           <div
                              className={cn(
                                 'border border-gray-200 shadow-xs rounded-md',
                                 'focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]',
                                 'transition-all duration-200',
                                 isMutationPending &&
                                    'opacity-50 pointer-events-none cursor-not-allowed'
                              )}
                           >
                              <BlockNoteView
                                 theme="light"
                                 editor={editor}
                                 formattingToolbar
                                 editable={!isMutationPending}
                                 className="px-2 py-2"
                                 onChange={() => {
                                    // Actualizar el formulario cuando cambie el contenido del editor
                                    setValue('content', editor.document, {
                                       shouldDirty: true,
                                       shouldValidate: true,
                                    })
                                 }}
                              />
                           </div>
                        )}
                     </div>
                  </CardContent>
               </Card>
            </div>

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

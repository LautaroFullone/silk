import { TextAreaForm, CheckboxForm, InputForm, PageTitle, ActionButton } from '@shared'
import { Save, Star, User, Quote, X, Upload } from 'lucide-react'
import { TestimonialFormData } from '@models/Testimonial.model'
import { getPublicImageUrl } from '@utils/getPublicImage'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
   useCreateTestimonial,
   useUpdateTestimonial,
   useFetchTestimonial,
} from '@hooks/react-query'
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

const initialFormData: TestimonialFormData = {
   personName: '',
   personRole: '',
   description: '',
   isHighlight: false,
   isActive: true,
   avatarFile: undefined,
}

const TestimonialForm = () => {
   const [previewUrl, setPreviewUrl] = useState<string>('')
   const { testimonialId } = useParams()
   const isEdit = Boolean(testimonialId)

   const { createTestimonialMutate, isPending: isCreateTestimonialPending } =
      useCreateTestimonial()
   const { updateTestimonialMutate, isPending: isUpdateTestimonialPending } =
      useUpdateTestimonial()

   // Obtener testimonio en modo edición
   const { testimonial: testimonialToEdit, isLoading: isLoadingTestimonial } =
      useFetchTestimonial({
         testimonialId: isEdit ? testimonialId : undefined,
      })

   const {
      watch,
      setValue,
      register,
      reset,
      handleSubmit,
      formState: { errors, isDirty },
   } = useForm<TestimonialFormData>({
      mode: 'onChange',
      reValidateMode: 'onChange',
      defaultValues: initialFormData,
   })

   const avatarFile = watch('avatarFile')

   // preview del nuevo archivo o del existente en modo edición
   useEffect(() => {
      if (avatarFile instanceof File) {
         const url = URL.createObjectURL(avatarFile)
         setPreviewUrl(url)
         return () => URL.revokeObjectURL(url)
      }

      if (isEdit && testimonialToEdit?.avatarImagePath) {
         setPreviewUrl(getPublicImageUrl(testimonialToEdit.avatarImagePath))
      } else {
         setPreviewUrl('')
      }
   }, [avatarFile, isEdit, testimonialToEdit])

   // Cargar datos del testimonio en modo edición
   useEffect(() => {
      if (isEdit && testimonialToEdit) {
         setValue('personName', testimonialToEdit.personName)
         setValue('personRole', testimonialToEdit.personRole)
         setValue('description', testimonialToEdit.description)
         setValue('isHighlight', testimonialToEdit.isHighlight)
         setValue('isActive', testimonialToEdit.isActive)
      }

      return () => {
         reset(initialFormData)
      }
   }, [testimonialToEdit, isEdit]) //eslint-disable-line

   const handleSaveTestimonial = async (formData: TestimonialFormData) => {
      console.log('# formData', formData)

      if (isEdit && testimonialId && testimonialToEdit) {
         await updateTestimonialMutate({ testimonialId, testimonialData: formData })
      } else {
         await createTestimonialMutate(formData)
         reset()
      }
   }

   // En modo creación se habilita al inicio y se deshabilita solo después del primer submit con errores, en edicion se habilita solo si hay cambios
   const isButtonEnabled = isEdit ? isDirty : !Object.keys(errors).length
   const isMutationPending = isCreateTestimonialPending || isUpdateTestimonialPending

   return (
      <>
         <div className="flex justify-between gap-2">
            <PageTitle
               title={isEdit ? 'Editar Testimonio' : 'Crear Nuevo Testimonio'}
               hasGoBack
               goBackRoute="ADMIN_TESTIMONIAL_LIST"
               description={
                  isEdit
                     ? 'Actualiza la información del testimonio'
                     : 'Ingresá el contenido del testimonio'
               }
            />

            <ActionButton
               size="lg"
               icon={Save}
               variant="primary"
               label={isEdit ? 'Guardar Cambios' : 'Guardar Testimonio'}
               className="hidden md:flex"
               isLoading={isMutationPending}
               disabled={!isButtonEnabled || isLoadingTestimonial}
               onClick={handleSubmit(handleSaveTestimonial)}
            />
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Columna Izquierda */}
            <div className="lg:col-span-2 space-y-6">
               <Card>
                  <CardHeader>
                     <CardTitle>Información General</CardTitle>
                     <CardDescription>Detalles básicos del testimonio</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                     <div className="grid grid-cols-2 gap-4">
                        <InputForm
                           type="text"
                           name="personName"
                           label="Nombre"
                           placeholder="Ej: Germán Beder"
                           isLoading={isLoadingTestimonial}
                           register={register('personName', {
                              required: 'El nombre es obligatorio',
                              maxLength: {
                                 value: 50,
                                 message: 'El nombre no puede superar los 50 caracteres',
                              },
                              pattern: {
                                 value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                                 message:
                                    'El nombre solo puede contener letras y espacios',
                              },
                           })}
                           errors={errors}
                        />

                        <InputForm
                           type="text"
                           name="personRole"
                           label="Profesión o Rol"
                           placeholder="Ej: Director de Marketing"
                           isLoading={isLoadingTestimonial}
                           register={register('personRole', {
                              required: 'La profesión o rol es obligatoro',
                              maxLength: {
                                 value: 50,
                                 message:
                                    'La profesión no puede superar los 50 caracteres',
                              },
                           })}
                           errors={errors}
                        />
                     </div>

                     <div className="space-y-1">
                        <Label htmlFor="avatarFile">Imagen del Cliente</Label>

                        <div className="flex">
                           <Input
                              id="avatarFile"
                              readOnly
                              value={avatarFile ? avatarFile.name : ''}
                              placeholder="Seleccioná una imagen..."
                              className="rounded-r-none border-r-0 bg-gray-50"
                           />

                           <div className="relative cursor-pointer">
                              <input
                                 type="file"
                                 id="avatarFile"
                                 accept="image/*"
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
                                    setValue('avatarFile', file || undefined, {
                                       shouldDirty: true,
                                       shouldValidate: true,
                                    })
                                 }}
                                 className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                              />

                              <Button
                                 type="button"
                                 variant="outline"
                                 className="rounded-l-none border-l-0 px-3 h-full bg-transparent cursor-pointer"
                                 asChild
                              >
                                 <label
                                    htmlFor="avatarFile"
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

                        {avatarFile && (
                           <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="px-0 text-red-600"
                              onClick={() =>
                                 setValue('avatarFile', undefined, { shouldDirty: true })
                              }
                           >
                              <X className="w-4 h-4 mr-1" />
                              Quitar imagen
                           </Button>
                        )}
                     </div>

                     <TextAreaForm
                        label="Descripción"
                        name="description"
                        placeholder="Ej: Silk transformó mi vida..."
                        isLoading={isLoadingTestimonial}
                        register={register('description', {
                           required: 'El testimonio es obligatorio',
                           maxLength: {
                              value: 500,
                              message:
                                 'El testimonio no puede superar los 500 caracteres',
                           },
                        })}
                        errors={errors}
                     />

                     <div className="grid grid-cols-2 gap-4">
                        <CheckboxForm
                           label="Mostrar en la web"
                           name="isActive"
                           description="Habilita que el testimonio aparezca en la landing page."
                           value={watch('isActive') || false}
                           isLoading={isLoadingTestimonial}
                           onChange={(val) =>
                              setValue('isActive', val, {
                                 shouldValidate: true,
                                 shouldDirty: true,
                              })
                           }
                           errors={errors}
                        />

                        <CheckboxForm
                           name="isHighlight"
                           label="Testimonio destacado"
                           description="Permite que el testimonio tenga un distintivo."
                           value={watch('isHighlight') || false}
                           isLoading={isLoadingTestimonial}
                           onChange={(val) =>
                              setValue('isHighlight', val, {
                                 shouldValidate: true,
                                 shouldDirty: true,
                              })
                           }
                           errors={errors}
                        />
                     </div>
                  </CardContent>
               </Card>
            </div>

            {/* Columna Derecha */}
            <div className="space-y-6">
               <Card className="overflow-hidden">
                  <CardHeader>
                     <CardTitle>Vista Previa</CardTitle>
                  </CardHeader>

                  <CardContent className="flex flex-col h-full">
                     <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-4 w-full">
                           <div className="relative flex-shrink-0 ">
                              <div className="w-16 h-16  rounded-full overflow-hidden border-3 border-white shadow-lg">
                                 <img
                                    src={previewUrl || '/image-placeholder.svg'}
                                    alt="Person image"
                                    className="w-16 h-16 object-cover"
                                 />
                              </div>

                              {watch('isHighlight') === true && (
                                 <div className="absolute -top-1 -right-1 bg-gradient-to-bl from-emerald-600 to-emerald-700 rounded-full p-1 shadow-lg">
                                    <Star className="w-3 h-3 text-white fill-current" />
                                 </div>
                              )}
                           </div>

                           <div className="flex-1 min-w-0">
                              <h3 className="text-xl font-serif text-gray-900 truncate">
                                 {watch('personName') || 'Nombre de la persona'}
                              </h3>

                              <div className="flex items-center text-gray-600 text-sm truncate">
                                 <User className="w-4 h-4 mr-1" />
                                 <span className="truncate">
                                    {watch('personRole') || 'Profesión'}
                                 </span>
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className="flex-1 flex flex-col">
                        <div className="relative flex-1">
                           <Quote className="absolute -top-1 -left-1 w-6 h-6 text-emerald-800" />
                           <blockquote className="text-gray-700 leading-relaxed pl-5 text-sm italic font-light">
                              "{watch('description') || 'Contenido de ejemplo'}"
                           </blockquote>
                        </div>
                     </div>
                  </CardContent>
               </Card>
            </div>

            <ActionButton
               size="lg"
               icon={Save}
               variant="primary"
               label={isEdit ? 'Guardar Cambios' : 'Guardar Testimonio'}
               className="md:hidden"
               isLoading={isMutationPending}
               disabled={!isButtonEnabled || isLoadingTestimonial}
               onClick={handleSubmit(handleSaveTestimonial)}
            />
         </div>
      </>
   )
}

export default TestimonialForm

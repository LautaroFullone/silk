import { TextAreaForm, CheckboxForm, InputForm, PageTitle, ActionButton } from '@shared'
import { Save, Upload, Star, User, Quote } from 'lucide-react'
import { Testimonial } from '@models/Testimonial.model'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
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

type TestimonialFormData = Partial<Testimonial> & {
   imageFile?: File
}

const initialFormData: TestimonialFormData = {
   personName: '',
   personRole: '',
   content: '',
   image: '',
   isHighlight: false,
   show: true,
}

const TestimonialForm = () => {
   const { articleId } = useParams()
   const isEdit = Boolean(articleId)

   const {
      watch,
      setValue,
      register,
      // reset: resetForm,
      // handleSubmit: handleFormSubmit,
      formState: { errors },
   } = useForm<TestimonialFormData>({
      mode: 'onChange',
      defaultValues: initialFormData,
   })

   const handleSaveTestimonial = () => {
      console.log('Guardar Testimonio', watch())
   }

   return (
      <>
         <div className="flex justify-between">
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
               isLoading={false}
               disabled={false}
               onClick={() => handleSaveTestimonial()}
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
                           name="name"
                           label="Nombre"
                           placeholder="Nombre del cliente"
                           register={register('personName')}
                           errors={errors}
                        />

                        <InputForm
                           type="text"
                           name="role"
                           label="Profesión o Rol"
                           placeholder="Profesión o Rol del cliente"
                           register={register('personRole')}
                           errors={errors}
                        />
                     </div>

                     <div className="space-y-1">
                        <Label htmlFor="image">Imagen del Cliente</Label>
                        <div className="flex">
                           <Input
                              id="image"
                              readOnly
                              value={
                                 watch('imageFile')
                                    ? watch('imageFile')?.name || 'Archivo seleccionado'
                                    : ''
                              }
                              placeholder="Seleccioná una imagen..."
                              className="rounded-r-none border-r-0 bg-gray-50"
                           />

                           <div className="relative cursor-pointer">
                              <input
                                 type="file"
                                 id="imageFile"
                                 accept="image/*"
                                 onChange={(e) => {
                                    const file = e.target.files?.[0]
                                    if (file) {
                                       // Create a temporary URL for preview
                                       const imageUrl = URL.createObjectURL(file)
                                       setValue('image', imageUrl)
                                       setValue('imageFile', file)
                                    }
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
                                    htmlFor="imageFile"
                                    className="flex items-center cursor-pointer"
                                 >
                                    <Upload className="w-4 h-4 cursor-pointer" />
                                 </label>
                              </Button>
                           </div>
                        </div>
                        <p className="text-xs text-gray-500">
                           Formatos soportados: JPG, PNG, GIF (máx. 5MB)
                        </p>
                     </div>

                     <TextAreaForm
                        name="content"
                        label="Texto"
                        placeholder="Texto del testimonio"
                        register={register('content')}
                        errors={errors}
                     />
                     <div className="grid grid-cols-2 gap-4">
                        <CheckboxForm
                           name="show"
                           label="Mostrar en la web"
                           description="Habilita que el testimonio aparezca en la landing page."
                           value={watch('show') || false}
                           onChange={(val) => setValue('show', val)}
                           errors={errors}
                        />

                        <CheckboxForm
                           name="isHighlight"
                           label="Testimonio destacado"
                           description="Permite que el testimonio tenga un distintivo."
                           value={watch('isHighlight') || false}
                           onChange={(val) => setValue('isHighlight', val)}
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
                                    src={watch('image') || '/placeholder.svg'}
                                    alt={'Person image'}
                                    className="w-16 h-16  object-cover"
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
                              "{watch('content') || 'Contenido de ejemplo'}"
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
               isLoading={false}
               disabled={false}
               onClick={() => handleSaveTestimonial()}
            />
         </div>
      </>
   )
}

export default TestimonialForm

import { Button, Card, CardContent, CardHeader, CardTitle, Input, Label } from '@shadcn'
import { TextAreaForm, CheckboxForm, InputForm, PageTitle, ActionButton } from '@shared'
import { Save, Upload, Star, User, Quote } from 'lucide-react'
import { Testimonial } from '@models/Testimonial.model'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'

type TestimonialFormData = Partial<Testimonial>

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
                     <CardTitle>Información Básica</CardTitle>
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

                     <div className="space-y-2">
                        <Label htmlFor="image">Imagen URL</Label>
                        <div className="flex gap-2">
                           <Input
                              id="image"
                              value={''}
                              onChange={() => {}}
                              placeholder="URL de la imagen"
                           />

                           <Button variant="link" size="icon">
                              <Upload className="w-4 h-4" />
                           </Button>
                        </div>
                     </div>

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

                     <TextAreaForm
                        name="content"
                        label="Texto"
                        placeholder="Texto del testimonio"
                        register={register('content')}
                        errors={errors}
                     />
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
                                    src={'/placeholder.svg'}
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

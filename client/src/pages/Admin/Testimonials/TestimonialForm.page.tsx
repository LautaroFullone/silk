import { Button, Card, CardContent, CardHeader, CardTitle, Input, Label } from '@shadcn'
import { Save, Upload, Star, User, Quote } from 'lucide-react'
import { Testimonial } from '@models/Testimonial.model'
import { useSearchParams } from 'react-router-dom'
import TextAreaForm from '@shared/TextAreaForm'
import CheckboxForm from '@shared/CheckboxForm'
import AdminTitle from '@shared/AdminTitle'
import { useForm } from 'react-hook-form'
import InputForm from '@shared/InputForm'

type TestimonialFormData = Partial<Testimonial>

const initialFormData: TestimonialFormData = {
   personName: '',
   personRole: '',
   content: '',
   image: '',
   isHighlight: false,
}

const TestimonialForm = () => {
   const [searchParams] = useSearchParams()
   console.log('## testimonial ID:', searchParams.get('id'))

   const isEdit = Boolean(searchParams.get('id'))
   const {
      watch,
      setValue,
      register,
      reset: resetForm,
      handleSubmit: handleFormSubmit,
      formState: { errors, isValid },
   } = useForm<TestimonialFormData>({
      mode: 'onChange',
      defaultValues: initialFormData,
   })

   console.log('# hola: ', watch('isHighlight'))

   return (
      <>
         <AdminTitle
            title={isEdit ? 'Editar Testimonio' : 'Crear Testimonio'}
            description={
               isEdit
                  ? 'Modificá el contenido del testimonio'
                  : 'Ingresá el contenido del testimonio'
            }
            hasGoBack
            goBackRoute="/admin/posts"
         />

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                           disabled={false}
                        />

                        <InputForm
                           type="text"
                           name="role"
                           label="Profesión o Rol"
                           placeholder="Profesión o Rol del cliente"
                           register={register('personRole')}
                           errors={errors}
                           disabled={false}
                        />
                     </div>

                     <div className="grid grid-cols-2 gap-4">
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

                        <CheckboxForm
                           name="isHighlight"
                           label="Marcar como destacado"
                           description="Habilitando esta opción el testimonio se mostrará en la web"
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
                        disabled={false}
                     />
                  </CardContent>
               </Card>
            </div>

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

               <Card>
                  <CardHeader>
                     <CardTitle>Acciones</CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-2">
                     <Button
                        className="w-full bg-emerald-800 hover:bg-emerald-900"
                        onClick={() => console.log('Publicar post')}
                     >
                        <Save className="w-4 h-4 mr-2" />
                        Guardar
                     </Button>
                  </CardContent>
               </Card>
            </div>
         </div>
      </>
   )
}

export default TestimonialForm

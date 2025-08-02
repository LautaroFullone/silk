import { Button, Card, CardContent, CardHeader, CardTitle, Input } from '@shadcn'
import { EditorJSComponent } from '@shared/EditorJSComponent'
import { Save, Upload, FileCheck } from 'lucide-react'
import type { OutputData } from '@editorjs/editorjs'
import { useSearchParams } from 'react-router-dom'
import TextAreaForm from '@shared/TextAreaForm'
import AdminTitle from '@shared/AdminTitle'
import { Post } from '@models/Post.model'
import { useForm } from 'react-hook-form'
import InputForm from '@shared/InputForm'
import { Label } from '@shadcn/label'

type TestimonialFormData = Partial<Post>

const initialFormData: TestimonialFormData = {
   title: '',
   author: '',
   date: '',
   description: '',
   content: {
      blocks: [
         {
            type: 'paragraph',
            data: {
               text: '',
            },
         },
      ],
   } as OutputData,
   subject: '',
   image: '',
   isVisible: false,
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

   return (
      <div className="space-y-6">
         <AdminTitle
            title={isEdit ? 'Editar Post' : 'Crear Post'}
            description={
               isEdit ? 'Modificá el contenido del post' : 'Ingresá el contenido del post'
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
                           name="title"
                           label="Título"
                           placeholder="Título del post"
                           register={register('title')}
                           errors={errors}
                           disabled={false}
                        />

                        <InputForm
                           type="text"
                           name="author"
                           label="Autor"
                           placeholder="Nombre del autor"
                           register={register('author')}
                           errors={errors}
                           disabled={false}
                        />
                     </div>

                     <div className="grid grid-cols-2 gap-4">
                        <InputForm
                           type="date"
                           name="date"
                           label="Fecha"
                           register={register('date')}
                           errors={errors}
                           disabled={false}
                        />

                        <InputForm
                           type="text"
                           name="subject"
                           label="Tema"
                           placeholder="Selecciona un tema"
                           register={register('subject')}
                           errors={errors}
                           disabled={false}
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

                     <TextAreaForm
                        name="description"
                        label="Descripción"
                        placeholder="Breve descripción del post"
                        register={register('description')}
                        errors={errors}
                        disabled={false}
                     />

                     <div className="space-y-2">
                        <Label htmlFor="content">Contenido</Label>

                        <EditorJSComponent
                           onChange={(data) => {
                              console.log('# form data: ', data)
                           }}
                           placeholder="Edita el contenido de tu post..."
                        />
                     </div>
                  </CardContent>
               </Card>
            </div>

            <div className="space-y-6">
               <Card>
                  <CardHeader>
                     <CardTitle>Vista Previa</CardTitle>
                  </CardHeader>

                  <CardContent>
                     <div className="space-y-2">
                        <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                           {watch('image') && (
                              <img
                                 src={'/placeholder.svg'}
                                 alt="Preview"
                                 className="w-full h-full object-cover"
                              />
                           )}
                        </div>
                        <h3 className="text-lg">{watch('title') || 'Título del post'}</h3>
                        <p className="text-sm text-gray-600">
                           {watch('description') || 'Descripción del post...'}
                        </p>
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
                        <FileCheck className="w-4 h-4 mr-2" />
                        Publicar
                     </Button>

                     <Button
                        variant="outline"
                        className="w-full bg-accent"
                        onClick={() => console.log('Guardar borrador')}
                     >
                        <Save className="w-4 h-4 mr-2" />
                        Guardar
                     </Button>
                  </CardContent>
               </Card>
            </div>
         </div>
      </div>
   )
}

export default TestimonialForm

import type { OutputData } from '@editorjs/editorjs'
import { useParams } from 'react-router-dom'
import { Save, Upload } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Post } from '@models/Post.model'
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
import {
   PageTitle,
   EditorJSComponent,
   InputForm,
   TextAreaForm,
   CheckboxForm,
   ActionButton,
} from '@shared'

type PostFormData = Partial<Post>

const initialFormData: PostFormData = {
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
   category: '',
   image: '',
   isActive: false,
}

const PostForm = () => {
   const { postId } = useParams()
   const isEdit = Boolean(postId)

   const {
      watch,
      setValue,
      register,
      // reset: resetForm,
      // handleSubmit: handleFormSubmit,
      formState: { errors },
   } = useForm<PostFormData>({
      mode: 'onChange',
      defaultValues: initialFormData,
   })

   const handleSavePost = () => {
      console.log('## Guardar post', watch())
   }

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
               isLoading={false}
               disabled={false}
               onClick={() => handleSavePost()}
            />
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                           name="category"
                           label="Categoria"
                           placeholder="Categoria del post"
                           register={register('category')}
                           errors={errors}
                           disabled={false}
                        />
                     </div>

                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
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
                           name="show"
                           label="Mostrar en la web"
                           description="Habilita que el post aparezca en la landing page."
                           value={watch('isActive') || false}
                           onChange={(val) => setValue('isActive', val)}
                           errors={errors}
                        />
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

            {/* Columna Derecha */}
            <div className="space-y-6">
               <Card>
                  <CardHeader>
                     <CardTitle>Vista Previa</CardTitle>
                  </CardHeader>

                  <CardContent>
                     <div className="space-y-2">
                        <div className="aspect-video bg-gray-200 rounded-md overflow-hidden">
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

               {/* <Card>
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
                        Guardar borrador
                     </Button>
                  </CardContent>
               </Card> */}
            </div>

            <ActionButton
               size="lg"
               icon={Save}
               variant="primary"
               label={isEdit ? 'Guardar Cambios' : 'Guardar Post'}
               className="md:hidden"
               isLoading={false}
               disabled={false}
               onClick={() => handleSavePost()}
            />
         </div>
      </>
   )
}

export default PostForm

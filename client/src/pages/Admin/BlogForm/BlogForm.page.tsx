import { useState, useEffect } from 'react'
import { ArrowLeft, Save, Eye, Upload } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import type { OutputData } from '@editorjs/editorjs'
import {
   Button,
   Card,
   CardContent,
   CardHeader,
   CardTitle,
   Input,
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@shadcn'
import { Label } from '@shadcn/label'
import { Textarea } from '@shadcn/textarea'
import TextEditor from '@shared/TextEditor/TextEditor'

interface BlogPost {
   id: string
   title: string
   author: string
   date: string
   description: string
   content: OutputData
   subject: string
   image: string
   isVisible: boolean
}

const mockPosts: BlogPost[] = [
   {
      id: '1',
      title: 'The live is life',
      author: 'Luciano Aldana',
      date: '2025-12-14',
      description:
         'El arte de crear experiencias digitales es más que simplemente escribir líneas de código...',
      content: {
         blocks: [
            {
               type: 'header',
               data: {
                  text: 'Introducción',
                  level: 2,
               },
            },
            {
               type: 'paragraph',
               data: {
                  text: 'El arte de crear experiencias digitales es más que simplemente escribir líneas de código. Es sobre entender las necesidades humanas, las emociones y crear conexiones significativas a través de la tecnología.',
               },
            },
            {
               type: 'header',
               data: {
                  text: 'La importancia del diseño centrado en el usuario',
                  level: 3,
               },
            },
            {
               type: 'paragraph',
               data: {
                  text: 'Cuando desarrollamos productos digitales, debemos pensar primero en las personas que los van a usar. Cada decisión de diseño debe estar respaldada por una comprensión profunda de nuestros usuarios.',
               },
            },
         ],
      },
      image: '/placeholder.svg?height=400&width=600',
      subject: 'Estilo',
      isVisible: true,
   },
   {
      id: '2',
      title: 'Tendencias de Moda 2025',
      author: 'Ana García',
      date: '2025-12-09',
      description:
         'Descubre las tendencias que marcarán el próximo año en el mundo de la moda...',
      content: {
         blocks: [
            {
               type: 'header',
               data: {
                  text: 'Las tendencias que definirán 2025',
                  level: 2,
               },
            },
            {
               type: 'paragraph',
               data: {
                  text: 'El mundo de la moda está en constante evolución, y 2025 promete ser un año revolucionario con nuevas tendencias que combinarán sostenibilidad, tecnología y expresión personal.',
               },
            },
            {
               type: 'list',
               data: {
                  style: 'unordered',
                  items: [
                     'Sostenibilidad como prioridad',
                     'Tecnología wearable',
                     'Personalización extrema',
                  ],
               },
            },
         ],
      },
      image: '/recomendacion-lauti.png',
      subject: 'draft',
      isVisible: true,
   },
]

const BlogForm = () => {
   const { idBlog } = useParams()
   console.log('## Blog ID:', idBlog)

   const navigate = useNavigate()
   const [post, setPost] = useState<BlogPost | null>(null)

   const params = useParams()

   const [formData, setFormData] = useState({
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
   })

   useEffect(() => {
      const foundPost = mockPosts.find((p) => p.id === params.id)
      if (foundPost) {
         setPost(foundPost)
         setFormData({
            title: foundPost.title,
            author: foundPost.author,
            date: foundPost.date,
            description: foundPost.description,
            content: foundPost.content,
            subject: foundPost.subject,
            image: foundPost.image,
            isVisible: foundPost.isVisible,
         })
      }
   }, [params.id])

   const handleContentChange = (data: OutputData) => {
      setFormData({ ...formData, content: data })
   }

   return (
      <div className="space-y-6">
         {/* Header */}
         <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
               <Button variant="outline" onClick={() => navigate(-1)}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Volver
               </Button>
               <div>
                  <h1 className="text-3xl font-serif text-gray-900">Editar Post</h1>
                  <p className="text-gray-600">Modificar el contenido del post</p>
               </div>
            </div>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
               {/* Basic Info */}
               <Card>
                  <CardHeader>
                     <CardTitle className="">Información Básica</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                           <Label htmlFor="title">Título</Label>
                           <Input
                              id="title"
                              value={formData.title}
                              onChange={(e) =>
                                 setFormData({ ...formData, title: e.target.value })
                              }
                              placeholder="Título del post"
                           />
                        </div>
                        <div className="space-y-2">
                           <Label htmlFor="author">Autor</Label>
                           <Input
                              id="author"
                              value={formData.author}
                              onChange={(e) =>
                                 setFormData({ ...formData, author: e.target.value })
                              }
                              placeholder="Nombre del autor"
                           />
                        </div>
                     </div>

                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                           <Label htmlFor="date">Fecha</Label>
                           <Input
                              id="date"
                              type="date"
                              value={formData.date}
                              onChange={(e) =>
                                 setFormData({ ...formData, date: e.target.value })
                              }
                           />
                        </div>
                        <div className="space-y-2">
                           <Label htmlFor="category">Categoría</Label>
                           <Select
                              value={formData.subject}
                              onValueChange={(value) =>
                                 setFormData({ ...formData, subject: value })
                              }
                           >
                              <SelectTrigger>
                                 <SelectValue placeholder="Selecciona una categoría" />
                              </SelectTrigger>
                              <SelectContent>
                                 <SelectItem value="estilo">Estilo</SelectItem>
                                 <SelectItem value="tendencias">Tendencias</SelectItem>
                                 <SelectItem value="consejos">Consejos</SelectItem>
                                 <SelectItem value="moda">Moda</SelectItem>
                              </SelectContent>
                           </Select>
                        </div>
                     </div>

                     <div className="space-y-2">
                        <Label htmlFor="image">Imagen URL</Label>
                        <div className="flex gap-2">
                           <Input
                              id="image"
                              value={formData.image}
                              onChange={(e) =>
                                 setFormData({ ...formData, image: e.target.value })
                              }
                              placeholder="URL de la imagen"
                           />
                           <Button variant="outline" size="icon">
                              <Upload className="w-4 h-4" />
                           </Button>
                        </div>
                     </div>

                     <div className="space-y-2">
                        <Label htmlFor="description">Descripción</Label>
                        <Textarea
                           id="description"
                           value={formData.description}
                           onChange={(e) =>
                              setFormData({ ...formData, description: e.target.value })
                           }
                           placeholder="Breve descripción del post"
                           rows={3}
                        />
                     </div>

                     {/* Content Editor - Directly after description */}
                     <div className="space-y-2">
                        <Label htmlFor="content">Contenido</Label>
                        <TextEditor
                           data={formData.content}
                           onChange={handleContentChange}
                           placeholder="Edita el contenido de tu post..."
                        />
                     </div>
                  </CardContent>
               </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
               {/* Preview */}
               <Card>
                  <CardHeader>
                     <CardTitle className="text-lg">Vista Previa</CardTitle>
                  </CardHeader>
                  <CardContent>
                     <div className="space-y-3">
                        <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                           {formData.image && (
                              <img
                                 src={formData.image || '/placeholder.svg'}
                                 alt="Preview"
                                 className="w-full h-full object-cover"
                              />
                           )}
                        </div>
                        <h3 className="font-serif text-lg">
                           {formData.title || 'Título del post'}
                        </h3>
                        <p className="text-sm text-gray-600">
                           {formData.description || 'Descripción del post...'}
                        </p>
                     </div>
                  </CardContent>
               </Card>

               {/* Actions */}
               <Card>
                  <CardHeader>
                     <CardTitle className="text-lg">Acciones</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                     <Button
                        variant="outline"
                        className="w-full bg-transparent"
                        onClick={() => console.log('Guardar borrador')}
                     >
                        <Save className="w-4 h-4 mr-2" />
                        Guardar Borrador
                     </Button>
                     <Button
                        className="w-full bg-emerald-800 hover:bg-emerald-900"
                        onClick={() => console.log('Publicar post')}
                     >
                        <Eye className="w-4 h-4 mr-2" />
                        Publicar Post
                     </Button>
                  </CardContent>
               </Card>
            </div>
         </div>
      </div>
   )
}

export default BlogForm

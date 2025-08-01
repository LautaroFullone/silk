import { ArrowUpDown, ChevronDown, ChevronUp, Plus } from 'lucide-react'
import AdminTitle from '@shared/AdminTitle/AdminTitle'
import BlogCard from './components/BlogCard'
import { Blog } from '@models/Blog.model'
import { useState } from 'react'
import {
   Button,
   Input,
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@shadcn'

const mockBlogs: Blog[] = [
   {
      id: '1',
      title: 'The live is life',
      author: 'Luciano Aldana',
      date: '2025-12-15',
      description:
         'El arte de crear experiencias digitales es más que simplemente escribir líneas de código...',
      content:
         '<p>El arte de crear experiencias digitales es más que simplemente escribir líneas de código...</p>',
      image: '/Adidas - Beige Sambas.png',
      isVisible: true,
      subject: 'Estilo',
   },
   {
      id: '2',
      title: 'Tendencias de Moda 2025',
      author: 'Ana García',
      date: '2025-12-10',
      description:
         'Descubre las tendencias que marcarán el próximo año en el mundo de la moda dsfsdf sdfdfsfdsfsdf dfsdfdsf sdfsdf sdfdsf',
      content: '<p>Las tendencias de moda para 2024 prometen ser revolucionarias...</p>',
      image: '/Banner-5.png',
      isVisible: false,
      subject: 'Tendencias',
   },
   {
      id: '3',
      title: 'Guía de Accesorios para Verano fdfsdfd  sdfdsfsdf sdfsdfsdfsdfdsf sdfdf ',
      author: 'Marina López',
      date: '2025-11-20',
      description:
         'Los accesorios ideales para destacar tu outfit en los días más calurosos.',
      content:
         '<p>Desde gafas de sol hasta bolsos de rafia, te contamos qué accesorios serán tendencia este verano.</p>',
      image: '/Gorra - Cher.png',
      isVisible: true,
      subject: 'Accesorios',
   },
   {
      id: '4',
      title: 'Minimalismo: Menos es Más',
      author: 'Pedro Sánchez',
      date: '2025-10-05',
      description:
         'Explora cómo el minimalismo se apodera de la moda y la vida cotidiana.',
      content:
         '<p>El minimalismo no solo es una tendencia estética, sino una forma de vida que apuesta por la simplicidad y la funcionalidad.</p>',
      image: '/Fotos_sección_pre-blog-05.jpg',
      isVisible: false,
      subject: 'Lifestyle',
   },
]

type SortFieldsType = 'date' | 'title' | 'author' | 'subject'

const BlogsPanel = () => {
   const [sortBy, setSortBy] = useState<SortFieldsType>('date')
   const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

   const [searchTerm, setSearchTerm] = useState('')
   // const [currentPage, setCurrentPage] = useState(1)
   // const [postsPerPage] = useState(5)

   const filteredAndSortedBlogs = mockBlogs
      .filter(
         (post) =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.subject.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
         let comparison = 0

         switch (sortBy) {
            case 'date':
               comparison = new Date(a.date).getTime() - new Date(b.date).getTime()
               break
            case 'title':
               comparison = a.title.localeCompare(b.title)
               break
            case 'author':
               comparison = a.author.localeCompare(b.author)
               break
            case 'subject':
               comparison = a.subject.localeCompare(b.subject)
               break
         }

         return sortOrder === 'asc' ? comparison : -comparison
      })

   return (
      <div className="space-y-8">
         <div className="flex justify-between items-center">
            <AdminTitle
               hasGoBack
               title="Gestión de Blogs"
               description="Crea y administra el contenido de los blogs"
            />

            <Button
               onClick={() => console.log('Crear nuevo post')}
               size="lg"
               className="bg-emerald-800 hover:bg-emerald-900 text-white"
            >
               <Plus className="w-4 h-4 mr-2" />
               Nuevo Post
            </Button>
         </div>

         {/* Search and Sort Controls */}
         <div className="flex flex-col md:flex-row gap-4 items-start ">
            <div className="flex-1 max-w-lg w-full">
               <Input
                  placeholder="Buscar posts por título, autor o categoría..."
                  value={searchTerm}
                  onChange={(e) => {
                     setSearchTerm(e.target.value)
                     // setCurrentPage(1)
                  }}
                  className="w-full"
               />
            </div>

            <div className="flex items-center gap-2">
               <span className="text-sm text-gray-600 whitespace-nowrap">
                  Ordenar por:
               </span>

               <Select
                  value={sortBy}
                  onValueChange={(value: SortFieldsType) => setSortBy(value)}
               >
                  <SelectTrigger className="w-30">
                     <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectItem value="date">Fecha</SelectItem>
                     <SelectItem value="title">Título</SelectItem>
                     <SelectItem value="author">Autor</SelectItem>
                     <SelectItem value="subject">Subject</SelectItem>
                  </SelectContent>
               </Select>

               <Button
                  variant="outline"
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="flex items-center gap-1 bg-white!"
               >
                  <ArrowUpDown className="w-4 h-4" />
                  {sortOrder === 'asc' ? (
                     <ChevronUp className="w-3 h-3" />
                  ) : (
                     <ChevronDown className="w-3 h-3" />
                  )}
               </Button>
            </div>
         </div>

         <div className="grid gap-6">
            {filteredAndSortedBlogs.map((blog, index) => (
               <BlogCard key={`blog-card-admin-${index}`} blog={blog} />
            ))}
         </div>

         {/* <PostEditor
            open={isEditing}
            onOpenChange={setIsEditing}
            post={selectedPost}
            onSave={handleSavePost}
         />

         <ConfirmationDialog
            open={deleteConfirmation.open}
            onOpenChange={(open) =>
               setDeleteConfirmation({ ...deleteConfirmation, open })
            }
            title="Eliminar Post"
            description={`¿Estás seguro de que quieres eliminar "${deleteConfirmation.title}"? Esta acción no se puede deshacer.`}
            onConfirm={() => handleDeletePost(deleteConfirmation.id)}
         /> */}
      </div>
   )
}
export default BlogsPanel

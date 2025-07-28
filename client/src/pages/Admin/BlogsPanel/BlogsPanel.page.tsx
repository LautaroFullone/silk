import { Button, Card, CardContent, Input } from '@shadcn'
import { Badge } from '@shadcn/badge'
import {
   ArrowUpDown,
   Calendar,
   ChevronDown,
   ChevronUp,
   Edit,
   Eye,
   Plus,
   Trash,
   User,
} from 'lucide-react'
import { useState } from 'react'
import BlogCard from './components/BlogCard'
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@shadcn/select'
import AdminTitle from '@shared/AdminTitle/AdminTitle'
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from '@shadcn/dropdown-menu'

const AdminBlogs = () => {
   const [posts, setPosts] = useState([
      {
         id: '1',
         title: 'The live is life',
         author: 'Luciano Aldana',
         date: '2023-12-15',
         excerpt:
            'El arte de crear experiencias digitales es más que simplemente escribir líneas de código...',
         content:
            '<p>El arte de crear experiencias digitales es más que simplemente escribir líneas de código...</p>',
         image: '/Adidas - Beige Sambas.png',
         status: 'published',
         category: 'Estilo',
      },
      {
         id: '2',
         title: 'Tendencias de Moda 2024',
         author: 'Ana García',
         date: '2023-12-10',
         excerpt:
            'Descubre las tendencias que marcarán el próximo año en el mundo de la moda...',
         content:
            '<p>Las tendencias de moda para 2024 prometen ser revolucionarias...</p>',
         image: '/Banner-5.png',
         status: 'draft',
         category: 'Tendencias',
      },
   ])

   const [selectedPost, setSelectedPost] = useState<any | null>(null)
   const [isEditing, setIsEditing] = useState(false)
   const [deleteConfirmation, setDeleteConfirmation] = useState<{
      open: boolean
      id: string
      title: string
   }>({ open: false, id: '', title: '' })
   const [sortBy, setSortBy] = useState<'date' | 'title' | 'author' | 'status'>('date')
   const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

   const handleNewPost = () => {
      setSelectedPost(null)
      setIsEditing(true)
   }

   const handleEditPost = (post: BlogPost) => {
      setSelectedPost(post)
      setIsEditing(true)
   }

   const handleSavePost = (postData: Partial<BlogPost>) => {
      if (selectedPost) {
         setPosts(
            posts.map((post) =>
               post.id === selectedPost.id ? { ...post, ...postData } : post
            )
         )
      } else {
         const newPost: BlogPost = {
            id: Date.now().toString(),
            ...postData,
            status: 'draft',
         } as BlogPost
         setPosts([...posts, newPost])
      }
      setIsEditing(false)
      setSelectedPost(null)
   }

   const handleDeletePost = (id: string) => {
      setPosts(posts.filter((post) => post.id !== id))
      setDeleteConfirmation({ open: false, id: '', title: '' })
   }

   const togglePostStatus = (id: string) => {
      setPosts(
         posts.map((post) =>
            post.id === id
               ? { ...post, status: post.status === 'published' ? 'draft' : 'published' }
               : post
         )
      )
   }

   const [searchTerm, setSearchTerm] = useState('')
   const [currentPage, setCurrentPage] = useState(1)
   const [postsPerPage] = useState(5)

   const filteredAndSortedPosts = posts
      .filter(
         (post) =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.category.toLowerCase().includes(searchTerm.toLowerCase())
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
            case 'status':
               comparison = a.status.localeCompare(b.status)
               break
         }

         return sortOrder === 'asc' ? comparison : -comparison
      })

   return (
      <div className="space-y-8">
         <div className="flex justify-between items-center">
            <AdminTitle
               title="Gestión de Blogs"
               description="Crea y administra el contenido de los blogs"
            />
            <Button
               onClick={handleNewPost}
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
                     setCurrentPage(1)
                  }}
                  className="w-full"
               />
            </div>

            <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
               <span className="text-sm text-gray-600 whitespace-nowrap">
                  Ordenar por:
               </span>

               <Select
                  value={sortBy}
                  onValueChange={(value: 'date' | 'title' | 'author' | 'status') =>
                     setSortBy(value)
                  }
               >
                  <SelectTrigger className="w-30">
                     <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectItem value="date">Fecha</SelectItem>
                     <SelectItem value="title">Título</SelectItem>
                     <SelectItem value="author">Autor</SelectItem>
                     <SelectItem value="status">Estado</SelectItem>
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
            {filteredAndSortedPosts.map((post, index) => (
               <BlogCard key={`blog-card-admin-${index}`} {...post} />
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
export default AdminBlogs

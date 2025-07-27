import { Button, Card, CardContent } from '@shadcn'
import { Badge } from '@shadcn/badge'
import { Calendar, Edit, Eye, Plus, Trash, User } from 'lucide-react'
import { useState } from 'react'

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
         image: '/Adidas - Beige Sambas.png',
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

   return (
      <div className="p-8 space-y-8">
         <div className="flex justify-between items-center">
            <div>
               <h1 className="text-4xl font-serif text-gray-900 mb-2">
                  Gestión de Posts
               </h1>
               <p className="text-gray-600">Crea y administra el contenido de tu blog</p>
            </div>
            <Button
               onClick={handleNewPost}
               className="bg-emerald-800 hover:bg-emerald-900 text-white"
            >
               <Plus className="w-4 h-4 mr-2" />
               Nuevo Post
            </Button>
         </div>

         <div className="grid gap-6">
            {posts.map((post) => (
               <Card
                  key={post.id}
                  className={`overflow-hidden transition-all p-0 ${
                     post.status === 'draft'
                        ? 'opacity-60 bg-gray-50 border-gray-300'
                        : 'opacity-100 bg-white border-gray-200'
                  }`}
               >
                  <CardContent className="p-0">
                     <div className="flex">
                        <div className="w-48 h-32 relative bg-gray-200">
                           <img
                              src={post.image || '/placeholder.svg'}
                              alt={post.title}
                              className="object-cover"
                           />
                           {post.status === 'draft' && (
                              <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                                 <span className="text-white text-sm font-medium">
                                    BORRADOR
                                 </span>
                              </div>
                           )}
                        </div>
                        <div className="flex-1 p-6">
                           <div className="flex justify-between items-start mb-4">
                              <div className="flex-1">
                                 <div className="flex items-center gap-3 mb-2">
                                    <h3
                                       className={`text-xl font-serif ${
                                          post.status === 'draft'
                                             ? 'text-gray-600'
                                             : 'text-gray-900'
                                       }`}
                                    >
                                       {post.title}
                                    </h3>
                                    <Badge
                                       variant={
                                          post.status === 'published'
                                             ? 'default'
                                             : 'secondary'
                                       }
                                       className={
                                          post.status === 'published'
                                             ? 'bg-emerald-800'
                                             : 'bg-gray-500'
                                       }
                                    >
                                       {post.status === 'published'
                                          ? 'Publicado'
                                          : 'Borrador'}
                                    </Badge>
                                 </div>
                                 <div
                                    className={`flex items-center text-sm mb-3 ${
                                       post.status === 'draft'
                                          ? 'text-gray-500'
                                          : 'text-gray-600'
                                    }`}
                                 >
                                    <User className="w-4 h-4 mr-1" />
                                    <span className="mr-4">{post.author}</span>
                                    <Calendar className="w-4 h-4 mr-1" />
                                    <span>
                                       {new Date(post.date).toLocaleDateString('es-ES')}
                                    </span>
                                 </div>
                                 <p
                                    className={`text-sm line-clamp-2 ${
                                       post.status === 'draft'
                                          ? 'text-gray-500'
                                          : 'text-gray-600'
                                    }`}
                                 >
                                    {post.excerpt}
                                 </p>
                              </div>
                              <div className="flex gap-2 ml-4">
                                 <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleEditPost(post)}
                                 >
                                    <Edit className="w-4 h-4" />
                                 </Button>
                                 <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => togglePostStatus(post.id)}
                                    className={
                                       post.status === 'draft'
                                          ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                                          : ''
                                    }
                                 >
                                    <Eye className="w-4 h-4" />
                                 </Button>
                                 <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                       setDeleteConfirmation({
                                          open: true,
                                          id: post.id,
                                          title: post.title,
                                       })
                                    }
                                    className="text-red-600 hover:text-red-700"
                                 >
                                    <Trash className="w-4 h-4" />
                                 </Button>
                              </div>
                           </div>
                        </div>
                     </div>
                  </CardContent>
               </Card>
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

import { ArrowUpDown, ChevronDown, ChevronUp, Plus } from 'lucide-react'
import { routesConfig } from '@config/routesConfig'
import { ActionButton, PageTitle } from '@shared'
import { useNavigate } from 'react-router-dom'
import PostCard from './components/PostCard'
import { useSearchAndSort } from '@hooks'
import { Post } from '@models/Post.model'
import {
   Button,
   Input,
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@shadcn'

const mockPosts: Post[] = [
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
      isActive: true,
      category: 'Estilo',
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
      isActive: false,
      category: 'Tendencias',
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
      isActive: true,
      category: 'Accesorios',
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
      isActive: false,
      category: 'Lifestyle',
   },
]

const PostsPanel = () => {
   const navigate = useNavigate()

   const {
      items: filteredAndSortedPosts,
      searchTerm,
      setSearchTerm,
      sortBy,
      setSortBy,
      sortOrder,
      toggleSortOrder,
      filters,
      updateFilter,
   } = useSearchAndSort({
      data: mockPosts,
      searchFields: ['title', 'author', 'category'],
      sortableFields: ['date', 'title', 'author'],
      initialFilters: { isActive: 'all' },
   })

   return (
      <>
         <div className="flex justify-between items-center gap-2">
            <PageTitle
               title="Gestión de Posts"
               description="Crea y administra el contenido de los posts"
            />

            <ActionButton
               size="lg"
               icon={Plus}
               variant="primary"
               label="Nuevo Post"
               className="hidden md:flex"
               onClick={() => navigate(routesConfig.ADMIN_POST_NEW)}
            />
         </div>

         <div className="flex flex-col lg:flex-row gap-x-4 gap-y-2 ">
            <Button
               onClick={() => navigate('form')}
               size="lg"
               className="bg-emerald-800 hover:bg-emerald-900 text-white lg:hidden"
            >
               <Plus className="w-4 h-4 mr-2" />
               Nuevo
            </Button>

            <div className="max-w-2xl w-full">
               <span className="text-sm text-gray-600">Buscador:</span>

               <Input
                  placeholder="Filtrar por título, autor o categoría..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
               />
            </div>

            <div className="flex items-end justify-between lg:justify-normal ">
               <div className="flex items-end gap-4">
                  <div className="flex flex-col">
                     <span className="text-sm text-gray-600 whitespace-nowrap">
                        Ordenar por:
                     </span>

                     <Select
                        value={sortBy}
                        onValueChange={(value: keyof Post) => setSortBy(value)}
                     >
                        <SelectTrigger className="sm:w-30">
                           <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                           <SelectItem value="date">Fecha</SelectItem>
                           <SelectItem value="title">Título</SelectItem>
                           <SelectItem value="author">Autor</SelectItem>
                        </SelectContent>
                     </Select>
                  </div>

                  <div className="flex flex-col">
                     <span className="text-sm text-gray-600 whitespace-nowrap">
                        Estado:
                     </span>

                     <Select
                        value={filters.isActive || 'all'} // 'all' | 'true' | 'false'
                        onValueChange={(value) => updateFilter('isActive', value)}
                     >
                        <SelectTrigger className="sm:w-30">
                           <SelectValue placeholder="Todos" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="all">Todos</SelectItem>
                           <SelectItem value="true">Publicado</SelectItem>
                           <SelectItem value="false">Borrador</SelectItem>
                        </SelectContent>
                     </Select>
                  </div>

                  <Button
                     variant="outline"
                     onClick={() => toggleSortOrder()}
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
         </div>

         <div className="grid gap-4">
            {filteredAndSortedPosts.map((post, index) => (
               <PostCard key={`post-card-admin-${index}`} post={post} />
            ))}
         </div>
      </>
   )
}
export default PostsPanel

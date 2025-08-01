import PostCard from './components/PostCard'
import { FileText } from 'lucide-react'
import { useState } from 'react'
import {
   Pagination,
   PaginationContent,
   PaginationItem,
   PaginationLink,
   PaginationNext,
   PaginationPrevious,
} from '@shadcn/pagination'
import useMobile from '@hooks/useMobile'
import { Post } from '@models/Post.model'

const ALL_POSTS: Post[] = [
   {
      id: '1',
      title: 'Cómo elegir tu look ideal',
      date: '2025-07-21',
      author: 'Lucía Fernández',
      description:
         'Descubrí los secretos para potenciar tu imagen personal con estos consejos de estilismo.',
      image: '/Banner-1.png',
      content: 'Contenido del post sobre cómo elegir tu look ideal.',
      isVisible: true,
      subject: 'Estilismo',
   },
   {
      id: '2',
      title: '5 errores comunes al combinar prendas',
      date: '2025-07-10',
      author: 'Martina López',
      description: 'Evitá estos errores clásicos y llevá tu estilo al siguiente nivel.',
      image: '/Banner-2.png',
      content: 'Contenido del post sobre errores al combinar prendas.',
      isVisible: true,
      subject: 'Consejos',
   },
   {
      id: '3',
      title: 'Tendencias 2025: qué se viene',
      date: '2025-07-02',
      author: 'Sofía Gutierrez',
      description: 'Lo último en moda y cómo adaptarlo a tu guardarropa.',
      image: '/Banner-3.png',
      content: 'Contenido sobre las tendencias de moda 2025.',
      isVisible: true,
      subject: 'Tendencias',
   },
   {
      id: '4',
      title: 'Colores que favorecen tu tono de piel',
      date: '2025-06-22',
      author: 'Julieta Díaz',
      description: 'Descubrí qué colores realzan tu imagen y te hacen lucir mejor.',
      image: '/Banner-4.png',
      content: 'Contenido del post sobre colores para cada tono de piel.',
      isVisible: true,
      subject: 'Colorimetría',
   },
   {
      id: '5',
      title: 'Cómo armar tu cápsula de básicos',
      date: '2025-06-15',
      author: 'Mariano Castro',
      description: 'Tips para un guardarropa versátil y funcional.',
      image: '/Banner-5.png',
      content: 'Contenido para crear una cápsula de básicos.',
      isVisible: true,
      subject: 'Estilo de vida',
   },
   {
      id: '6',
      title: 'Accesorios: el detalle que transforma',
      date: '2025-06-05',
      author: 'Valeria Suárez',
      description: 'Aprendé a usar accesorios para sumar personalidad a tu look.',
      image: '/Banner-1.png',
      content: 'Contenido sobre el uso de accesorios.',
      isVisible: true,
      subject: 'Accesorios',
   },
]

const POSTS_PER_PAGE = 6 // Cambia este valor para ver más o menos por página

const Blog = () => {
   const [currentPage, setCurrentPage] = useState(1)
   const isMobile = useMobile()

   // Calcula qué posts mostrar
   const totalPages = Math.ceil(ALL_POSTS.length / POSTS_PER_PAGE)
   const startIdx = (currentPage - 1) * POSTS_PER_PAGE
   const endIdx = startIdx + POSTS_PER_PAGE
   const posts = ALL_POSTS.slice(startIdx, endIdx)

   return (
      <div className="min-h-screen px-6 pb-10">
         <div className="max-w-6xl mx-auto pt-12">
            <h1 className="text-secondary text-5xl font-serif text-center mb-12 tracking-wide">
               Posts publicados
            </h1>
            {posts.length === 0 ? (
               <div className="flex flex-col items-center justify-center text-primary">
                  <FileText size={80} className="text-4xl mb-2" />
                  <p className="text-2xl font-serif">Aún no hay artículos publicados.</p>
               </div>
            ) : (
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 overflow-y-auto max-h-[100vh] p-3">
                  {posts.map((post, index) => (
                     <PostCard key={`post-card-client-${index}`} post={post} />
                  ))}
               </div>
            )}

            {totalPages > 1 && (
               <div className="mt-12 flex justify-center text-secondary">
                  <Pagination>
                     <PaginationContent className="cursor-pointer select-none">
                        <PaginationItem>
                           <PaginationPrevious
                              onClick={() =>
                                 setCurrentPage((prev) => Math.max(prev - 1, 1))
                              }
                           />
                        </PaginationItem>

                        {!isMobile &&
                           Array.from({ length: totalPages }, (_, i) => i + 1).map(
                              (page) => (
                                 <PaginationItem key={page}>
                                    <PaginationLink
                                       onClick={() => setCurrentPage(page)}
                                       isActive={currentPage === page}
                                    >
                                       {page}
                                    </PaginationLink>
                                 </PaginationItem>
                              )
                           )}

                        {isMobile && (
                           <PaginationItem>
                              <span className="text-sm">
                                 Página {currentPage} de {totalPages}
                              </span>
                           </PaginationItem>
                        )}

                        <PaginationItem>
                           <PaginationNext
                              onClick={() =>
                                 setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                              }
                           />
                        </PaginationItem>
                     </PaginationContent>
                  </Pagination>
               </div>
            )}
         </div>
      </div>
   )
}

export default Blog

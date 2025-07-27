import BlogCard from './components/BlogCard'
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

const ALL_BLOGS = [
   {
      id: 1,
      title: 'Cómo elegir tu look ideal',
      summary:
         'Descubrí los secretos para potenciar tu imagen personal con estos consejos de estilismo.',
      image: '/Banner-1.png',
      date: '21 de Julio, 2025',
   },
   {
      id: 2,
      title: '5 errores comunes al combinar prendas',
      summary: 'Evitá estos errores clásicos y llevá tu estilo al siguiente nivel.',
      image: '/Banner-2.png',
      date: '10 de Julio, 2025',
   },
   {
      id: 3,
      title: 'Tendencias 2025: qué se viene',
      summary: 'Lo último en moda y cómo adaptarlo a tu guardarropa.',
      image: '/Banner-3.png',
      date: '02 de Julio, 2025',
   },
   // Agregá más si querés testear la paginación
   {
      id: 4,
      title: 'Colores que favorecen tu tono de piel',
      summary: 'Descubrí qué colores realzan tu imagen y te hacen lucir mejor.',
      image: '/Banner-4.png',
      date: '22 de Junio, 2025',
   },
   {
      id: 5,
      title: 'Cómo armar tu cápsula de básicos',
      summary: 'Tips para un guardarropa versátil y funcional.',
      image: '/Banner-5.png',
      date: '15 de Junio, 2025',
   },
   {
      id: 6,
      title: 'Accesorios: el detalle que transforma',
      summary: 'Aprendé a usar accesorios para sumar personalidad a tu look.',
      image: '/Banner-1.png',
      date: '05 de Junio, 2025',
   },
   {
      id: 1,
      title: 'Cómo elegir tu look ideal',
      summary:
         'Descubrí los secretos para potenciar tu imagen personal con estos consejos de estilismo.',
      image: '/Banner-1.png',
      date: '21 de Julio, 2025',
   },
   {
      id: 2,
      title: '5 errores comunes al combinar prendas',
      summary: 'Evitá estos errores clásicos y llevá tu estilo al siguiente nivel.',
      image: '/Banner-2.png',
      date: '10 de Julio, 2025',
   },
   {
      id: 3,
      title: 'Tendencias 2025: qué se viene',
      summary: 'Lo último en moda y cómo adaptarlo a tu guardarropa.',
      image: '/Banner-3.png',
      date: '02 de Julio, 2025',
   },
   // Agregá más si querés testear la paginación
   {
      id: 4,
      title: 'Colores que favorecen tu tono de piel',
      summary: 'Descubrí qué colores realzan tu imagen y te hacen lucir mejor.',
      image: '/Banner-4.png',
      date: '22 de Junio, 2025',
   },
   {
      id: 5,
      title: 'Cómo armar tu cápsula de básicos',
      summary: 'Tips para un guardarropa versátil y funcional.',
      image: '/Banner-5.png',
      date: '15 de Junio, 2025',
   },
   {
      id: 6,
      title: 'Accesorios: el detalle que transforma',
      summary: 'Aprendé a usar accesorios para sumar personalidad a tu look.',
      image: '/Banner-1.png',
      date: '05 de Junio, 2025',
   },
]

const BLOGS_PER_PAGE = 6 // Cambia este valor para ver más o menos por página

const Blogs = () => {
   const [currentPage, setCurrentPage] = useState(1)
   const isMobile = useMobile()

   // Calcula qué blogs mostrar
   const totalPages = Math.ceil(ALL_BLOGS.length / BLOGS_PER_PAGE)
   const startIdx = (currentPage - 1) * BLOGS_PER_PAGE
   const endIdx = startIdx + BLOGS_PER_PAGE
   const blogs = ALL_BLOGS.slice(startIdx, endIdx)

   return (
      <div className="min-h-screen px-6 pb-10">
         <div className="max-w-6xl mx-auto pt-12">
            <h1 className="text-secondary text-5xl font-serif text-center mb-12 tracking-wide">
               Blogs publicados
            </h1>
            {blogs.length === 0 ? (
               <div className="flex flex-col items-center justify-center text-primary">
                  <FileText size={80} className="text-4xl mb-2" />
                  <p className="text-2xl font-serif">Aún no hay artículos publicados.</p>
               </div>
            ) : (
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 overflow-y-auto max-h-[100vh] p-3">
                  {blogs.map((blog) => (
                     <BlogCard
                        key={blog.id}
                        id={String(blog.id)}
                        title={blog.title}
                        description={blog.summary}
                        imageSrc={blog.image}
                        date={blog.date}
                     />
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

export default Blogs

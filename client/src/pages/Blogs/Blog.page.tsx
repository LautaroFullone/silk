// src/pages/BlogList.tsx

import {
   Pagination,
   PaginationContent,
   PaginationItem,
   PaginationLink,
   PaginationNext,
   PaginationPrevious,
} from '@shadcn/pagination'
import { FileText } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

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

   // Calcula qué blogs mostrar
   const totalPages = Math.ceil(ALL_BLOGS.length / BLOGS_PER_PAGE)
   const startIdx = (currentPage - 1) * BLOGS_PER_PAGE
   const endIdx = startIdx + BLOGS_PER_PAGE
   const blogs = ALL_BLOGS.slice(startIdx, endIdx)

   return (
      <div className="min-h-screen bg-[#f6f6f2] px-6 pb-10">
         <div className="max-w-6xl mx-auto pt-12">
            <h1 className="text-5xl font-serif text-center mb-12 tracking-wide">Blog</h1>
            {blogs.length === 0 ? (
               <div className="flex flex-col items-center justify-center text-primary">
                  <FileText size={80} className="text-4xl mb-2" />
                  <p className="text-2xl font-serif">Aún no hay artículos publicados.</p>
               </div>
            ) : (
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 overflow-y-auto max-h-[65vh] p-3">
                  {blogs.map((blog) => (
                     <Link to={`/blog/${blog.id}`} key={blog.id} className="group">
                        <div className="rounded-sm shadow-sm bg-white hover:shadow-lg transition-all overflow-hidden flex flex-col h-full">
                           {blog.image && (
                              <img
                                 src={blog.image}
                                 alt={blog.title}
                                 className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-200"
                              />
                           )}
                           <div className="p-5 flex flex-col flex-1">
                              <h2 className="text-xl font-bold mb-2 text-primary transition-colors">
                                 {blog.title}
                              </h2>
                              <div className="text-gray-400 text-xs mb-3">
                                 {blog.date}
                              </div>
                              <p className="text-gray-700 flex-1 mb-3">{blog.summary}</p>
                              <span className="text-green-900 font-medium group-hover:underline transition-all">
                                 Leer más →
                              </span>
                           </div>
                        </div>
                     </Link>
                  ))}
               </div>
            )}
            {totalPages > 1 && (
               <div className="mt-12 flex justify-center">
                  <Pagination>
                     <PaginationContent>
                        <PaginationItem>
                           <PaginationPrevious
                              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                              className={
                                 currentPage === 1 ? 'pointer-events-none opacity-40' : ''
                              }
                           />
                        </PaginationItem>
                        {[...Array(totalPages)].map((_, i) => (
                           <PaginationItem key={i}>
                              <PaginationLink
                                 isActive={i + 1 === currentPage}
                                 onClick={() => setCurrentPage(i + 1)}
                              >
                                 {i + 1}
                              </PaginationLink>
                           </PaginationItem>
                        ))}
                        <PaginationItem>
                           <PaginationNext
                              onClick={() =>
                                 setCurrentPage((p) => Math.min(p + 1, totalPages))
                              }
                              className={
                                 currentPage === totalPages
                                    ? 'pointer-events-none opacity-40'
                                    : ''
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

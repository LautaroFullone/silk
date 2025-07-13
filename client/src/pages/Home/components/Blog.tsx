import {
   Carousel,
   CarouselContent,
   CarouselItem,
   CarouselNext,
   CarouselPrevious,
} from '@shadcn/carousel'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const mockBlogs = [
   {
      id: '1',
      img: '/Banner-1.png',
      category: 'STYLE',
      title: 'Butter Yellow is hot!',
      author: 'Lucas Contardi',
   },
   {
      id: '2',
      img: '/Banner-2.png',
      category: 'BEAUTY',
      title: 'Top 5 No-Makeup looks',
      author: 'Maggie Cruz Frezzini',
   },
   {
      id: '3',
      img: '/Banner-3.png',
      category: 'CELEBRITY',
      title: 'Taylor Swift vistiendo Versace',
      author: 'Lucas Contardi',
   },
   {
      id: '4',
      img: '/Banner-1.png',
      category: 'STYLE',
      title: 'Butter Yellow is hot!',
      author: 'Lucas Contardi',
   },
   {
      id: '5',
      img: '/Banner-2.png',
      category: 'BEAUTY',
      title: 'Top 5 No-Makeup looks',
      author: 'Maggie Cruz Frezzini',
   },
   {
      id: '6',
      img: '/Banner-3.png',
      category: 'CELEBRITY',
      title: 'Taylor Swift vistiendo Versace',
      author: 'Lucas Contardi',
   },
]

const Blog: React.FC = () => {
   // eslint-disable-next-line
   const [blogs, setBlogs] = useState<any[]>([])
   const [currentIndex, setCurrentIndex] = useState(0)
   const itemsPerPage = 3

   useEffect(() => {
      setBlogs(mockBlogs)
   }, [])

   const nextSlide = () => {
      setCurrentIndex((prevIndex) =>
         blogs.length <= itemsPerPage ? 0 : (prevIndex + 1) % blogs.length
      )
   }

   const prevSlide = () => {
      setCurrentIndex((prevIndex) =>
         blogs.length <= itemsPerPage ? 0 : (prevIndex - 1 + blogs.length) % blogs.length
      )
   }

   return (
      <section className="bg-tertiary py-20">
         <div className="max-w-xs sm:max-w-xl lg:max-w-5xl mx-auto text-secondary">
            <h2 className="font-very-vogue text-5xl text-center mb-10">
               Lo <span className="italic mr-1">último</span> de nuestro blog
            </h2>

            {!blogs.length ? (
               <p className="text-center text-gray-500 mt-10 text-xl">
                  Aún no hay entradas de blog.
               </p>
            ) : (
               <>
                  <div className="sm:hidden flex justify-center mb-2 text-xs text-gray-400">
                     Desliza para ver más
                  </div>
                  {/* <CarouselPrevious className="flex-shrink-0 mr-2" /> */}
                  <Carousel
                     opts={{
                        align: 'start',
                        loop: true,
                     }}
                     className="w-full"
                  >
                     <CarouselPrevious className="hidden sm:flex" />
                     <CarouselContent className="m-0">
                        {blogs.map((blog) => (
                           <CarouselItem
                              key={`blog-slot-${blog.id}`}
                              className="basis-full sm:basis-1/2 lg:basis-1/3 px-2 pl-2 pr-2"
                           >
                              <Link
                                 to={`/blog/${blog.id}`}
                                 className="block w-full group text-left"
                              >
                                 <div className="relative mb-3 aspect-square rounded-sm overflow-hidden">
                                    <img
                                       src={blog.img}
                                       alt={blog.title}
                                       className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                                    />

                                    <div className="absolute left-3 bottom-3 bg-tertiary px-3 py-1 rounded text-sm font-semibold uppercase shadow">
                                       {blog.category}
                                    </div>
                                 </div>

                                 <h3 className="text-lg  font-bold mb-1">{blog.title}</h3>

                                 <p className="text-xs text-gray-500 mb-1">
                                    BY {blog.author?.toUpperCase()}
                                 </p>
                              </Link>
                           </CarouselItem>
                        ))}
                     </CarouselContent>
                     <CarouselNext className="hidden sm:flex" />
                     {/* <CarouselPrevious className="hidden sm:flex left-2 z-10" />
                     <CarouselNext className="hidden sm:flex right-2 z-10" /> */}
                  </Carousel>
               </>
            )}
         </div>
      </section>
   )
}

export default Blog

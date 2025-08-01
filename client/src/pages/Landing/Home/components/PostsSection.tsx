import { Link } from 'react-router-dom'
import { useState } from 'react'
import {
   Carousel,
   CarouselContent,
   CarouselItem,
   CarouselNext,
   CarouselPrevious,
} from '@shadcn/carousel'

const mockPosts = [
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

const PostsSection = () => {
   const [posts] = useState(mockPosts)
   const showArrows = posts?.length >= 3

   return (
      <section className="bg-tertiary py-20">
         <div className="max-w-xs sm:max-w-xl lg:max-w-5xl mx-auto text-secondary">
            <h2 className="font-very-vogue text-5xl text-center mb-10">
               Lo <span className="italic mr-1">último</span> de nuestro blog
            </h2>

            {!posts.length ? (
               <p className="text-center text-gray-500 mt-10 text-xl">
                  Aún no hay entradas de blog.
               </p>
            ) : (
               <>
                  {showArrows && (
                     <div className="text-center mb-2 text-xs text-gray-400">
                        Desliza para ver más
                     </div>
                  )}

                  <Carousel
                     opts={{
                        align: 'start',
                        loop: true,
                     }}
                     className="w-full"
                  >
                     {showArrows && <CarouselPrevious />}

                     <CarouselContent className="m-0">
                        {posts.map(({ id, author, category, img, title }) => (
                           <CarouselItem
                              key={`post-slot-${id}`}
                              className="basis-full sm:basis-1/2 lg:basis-1/3 px-2 pl-2 pr-2"
                           >
                              <Link
                                 to={`/blog/${id}`}
                                 className="block w-full group text-left"
                              >
                                 <div className="relative mb-3 aspect-square rounded-sm overflow-hidden">
                                    <img
                                       src={img}
                                       alt={title}
                                       className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-200"
                                    />

                                    <div className="absolute left-3 bottom-3 bg-white px-3 py-1 rounded text-sm font-semibold uppercase">
                                       {category}
                                    </div>
                                 </div>

                                 <h3 className="text-lg font-bold mb-1">{title}</h3>

                                 <p className="text-xs text-gray-500 mb-1">
                                    BY {author?.toUpperCase()}
                                 </p>
                              </Link>
                           </CarouselItem>
                        ))}
                     </CarouselContent>

                     {showArrows && <CarouselNext />}
                  </Carousel>
               </>
            )}
         </div>
      </section>
   )
}

export default PostsSection

import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge } from '@shadcn'
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
      img: '/service-transform-life.png',
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
   // ...otros posts
]

const PostsSection = () => {
   const posts = mockPosts
   const showArrows = posts?.length >= 3

   return (
      <section className="bg-tertiary py-20">
         <div className="max-w-xs sm:max-w-xl lg:max-w-5xl mx-auto text-secondary">
            <h2 className="font-very-vogue text-5xl text-center mb-10">
               Lo <span className="italic mr-1">último</span> de nuestro blog
            </h2>

            {!posts.length ? (
               <p className="text-center text-muted-foreground mt-10 text-xl">
                  Aún no hay entradas de blog.
               </p>
            ) : (
               <>
                  {showArrows && (
                     <div className="text-center mb-2 text-xs text-muted-foreground">
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
                              className="basis-full sm:basis-1/2 lg:basis-1/3 px-2"
                           >
                              <Link
                                 to={`/blog/${id}`}
                                 className="block w-full group text-left "
                              >
                                 {/* Barra superior tipo ventana */}
                                 <div className="w-full flex items-center p-2 bg-secondary rounded-t-sm border border-secondary">
                                    <div className="flex space-x-1.5">
                                       <span className="block w-2 h-2 bg-gray-400 rounded-full" />
                                       <span className="block w-2 h-2 bg-gray-400 rounded-full" />
                                       <span className="block w-2 h-2 bg-gray-400 rounded-full" />
                                    </div>
                                 </div>

                                 {/* Imagen y badge */}
                                 <div className="relative aspect-square overflow-hidden bg-secondary border border-secondary">
                                    <img
                                       src={img}
                                       alt={title}
                                       className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-200"
                                    />

                                    <Badge
                                       variant="default"
                                       className="absolute bottom-3 right-3 bg-primary text-white border-none rounded-xs uppercase"
                                    >
                                       {category}
                                    </Badge>
                                 </div>

                                 {/* Card de info, igual que PostCard */}
                                 <div className="bg-white border border-secondary border-t-0 rounded-b-sm px-5 pt-5 pb-4 flex flex-col">
                                    <h2 className="text-xl font-serif text-secondary mb-1 leading-snug truncate">
                                       {title}
                                    </h2>

                                    <p className="text-xs text-muted-foreground font-medium tracking-wide mb-4">
                                       by {author}
                                    </p>

                                    <span className="flex items-center gap-1 text-primary font-medium group-hover:underline transition-all mt-auto">
                                       Leer más <ChevronRight size={16} />
                                    </span>
                                 </div>
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

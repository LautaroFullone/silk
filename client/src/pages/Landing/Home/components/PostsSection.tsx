import { EmptyBannerLanding, PageTitleLanding } from '@shared'
import PostCard from '@pages/Landing/Blog/components/PostCard'
import { useFetchPosts, useMobile } from '@hooks'
import { FileText } from 'lucide-react'
import {
   Carousel,
   CarouselContent,
   CarouselItem,
   CarouselNext,
   CarouselPrevious,
} from '@shadcn/carousel'

const PostsSection = () => {
   const { posts, isLoading } = useFetchPosts({ onlyActive: true })

   const isMobile = useMobile()

   const showArrows = !isMobile && posts.length >= 3
   const showSlideMessage =
      (isMobile && posts.length > 1) || (!isMobile && posts.length > 3)

   return (
      <section className="bg-silk-tertiary">
         <div className="container py-15 md:py-20 space-y-10">
            <PageTitleLanding
               element="h2"
               title={
                  <>
                     {' '}
                     Lo <span className="italic mr-1">último</span> de nuestro blog
                  </>
               }
            />

            {isLoading ? (
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
                  {Array.from({ length: isMobile ? 1 : 3 }).map((_, index) => (
                     <PostCard.Skeleton key={`post-skeleton-${index}`} />
                  ))}
               </div>
            ) : posts.length === 0 ? (
               <EmptyBannerLanding
                  icon={FileText}
                  title="No hay Posts registrados"
                  description="Pronto tendremos contenido increíble para vos"
               />
            ) : (
               <>
                  {showSlideMessage && (
                     <div className="text-center mb-2 text-xs text-muted-foreground">
                        Desliza para ver más
                     </div>
                  )}

                  <Carousel
                     opts={{
                        align: 'start',
                        loop: true,
                     }}
                  >
                     {showArrows && <CarouselPrevious />}

                     <CarouselContent className="m-0">
                        {posts.map((post, index) => (
                           <CarouselItem
                              key={`post-slot-${index}`}
                              className="basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 px-2"
                           >
                              <PostCard key={`post-client-${post.id}`} post={post} />
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

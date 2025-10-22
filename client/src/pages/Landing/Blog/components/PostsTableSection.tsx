import { Pagination } from '@shared'
import { Post } from '@models/Post.model'
import { FileText } from 'lucide-react'
import PostCard from './PostCard'

interface PostsTableSectionProps {
   paginatedPosts: Post[]
   isLoading: boolean
   currentPage: number
   totalPages: number
   canGoNext: boolean
   canGoPrevious: boolean
   onPageChange: (page: number) => void
   emptyMessage: string
}

const PostsTableSection: React.FC<PostsTableSectionProps> = ({
   paginatedPosts,
   isLoading,
   currentPage,
   totalPages,
   canGoNext,
   canGoPrevious,
   onPageChange,
   emptyMessage,
}) => {
   return (
      <section className="space-y-4">
         {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
               {Array.from({ length: 6 }).map((_, index) => (
                  <PostCard.Skeleton key={`post-skeleton-${index}`} />
               ))}
            </div>
         ) : paginatedPosts.length === 0 ? (
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-12 border border-silk-secondary/20 text-center">
               <FileText size={80} className="mx-auto text-silk-secondary/60 mb-4" />
               <h3 className="font-very-vogue text-2xl text-silk-secondary mb-2">
                  No hay Posts registrados
               </h3>

               <p className="text-silk-secondary/80">{emptyMessage}</p>
            </div>
         ) : (
            <>
               {totalPages > 1 && !isLoading && (
                  <Pagination
                     isLanding
                     currentPage={currentPage}
                     totalPages={totalPages}
                     onPageChange={onPageChange}
                     canGoNext={canGoNext}
                     canGoPrevious={canGoPrevious}
                     scrollToTop={false}
                  />
               )}

               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {paginatedPosts.map((post, index) => (
                     <PostCard key={`post-card-client-${post.id}-${index}`} post={post} />
                  ))}
               </div>

               {totalPages > 1 && !isLoading && (
                  <Pagination
                     isLanding
                     scrollToTop
                     currentPage={currentPage}
                     totalPages={totalPages}
                     onPageChange={onPageChange}
                     canGoNext={canGoNext}
                     canGoPrevious={canGoPrevious}
                  />
               )}
            </>
         )}
      </section>
   )
}

export default PostsTableSection

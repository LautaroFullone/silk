import { ConfirmActionModal, EmptyBanner, Pagination } from '@shared'
import { routesConfig } from '@config/routesConfig'
import { useNavigate } from 'react-router-dom'
import { Post } from '@models/Post.model'
import { Trash2 } from 'lucide-react'
import { useState } from 'react'
import PostCard from './PostCard'

interface PostsTableProps {
   paginatedPosts: Post[]
   isLoading: boolean
   currentPage: number
   totalPages: number
   canGoNext: boolean
   canGoPrevious: boolean
   onPageChange: (page: number) => void
   emptyMessage: string
}

const PostsTable: React.FC<PostsTableProps> = ({
   paginatedPosts,
   isLoading,
   currentPage,
   totalPages,
   canGoNext,
   canGoPrevious,
   onPageChange,
   emptyMessage,
}) => {
   const navigate = useNavigate()
   const [selectedPost, setSelectedPost] = useState<Post | null>(null)

   // const { deletePostMutate, isPending } = useDeletePost() // TODO: Implementar hook

   return (
      <>
         <div className="grid grid-cols-1 gap-4">
            {isLoading ? (
               Array.from({ length: 5 }).map((_, i) => (
                  <PostCard.Skeleton key={`skeleton-post-${i}`} />
               ))
            ) : paginatedPosts.length ? (
               paginatedPosts.map((post) => (
                  <PostCard
                     key={`post-card-${post.id}`}
                     post={post}
                     onEdit={(post) =>
                        navigate(routesConfig.ADMIN_POST_EDIT.replace(':postId', post.id))
                     }
                     onDelete={setSelectedPost}
                  />
               ))
            ) : (
               <div className="col-span-full">
                  <EmptyBanner
                     title="No hay posts registrados"
                     description={emptyMessage}
                  />
               </div>
            )}
         </div>

         {totalPages > 1 && !isLoading && (
            <Pagination
               currentPage={currentPage}
               totalPages={totalPages}
               onPageChange={onPageChange}
               canGoNext={canGoNext}
               canGoPrevious={canGoPrevious}
            />
         )}

         <ConfirmActionModal
            isOpen={!!selectedPost}
            isLoading={false} // TODO: usar isPending cuando se implemente el hook
            title={
               <>
                  ¿Estás seguro que querés eliminar el post{' '}
                  <span className="font-semibold">{selectedPost?.title}</span>?
               </>
            }
            description="Se eliminará permanentemente el post. Esta acción no se puede deshacer."
            confirmButton={{
               icon: Trash2,
               label: 'Eliminar post',
               loadingLabel: 'Eliminando...',
               variant: 'destructive',
               onConfirm: async () => {
                  // TODO: await deletePostMutate(selectedPost!.id)
                  setSelectedPost(null)
               },
            }}
            cancelButton={{
               label: 'No, mantener',
               variant: 'outline',
               onCancel: () => setSelectedPost(null),
            }}
         />
      </>
   )
}
export default PostsTable

import { getPublicImageUrl } from '@utils/getPublicImage'
import { formatDateToShow } from '@utils/formatDateToShow'
import { formatRelativeTime } from '@utils/formatRelativeTime'
import { useFetchPost, useFetchPosts } from '@hooks/react-query'
import { useParams, Link } from 'react-router-dom'
import { routesConfig } from '@config/routesConfig'
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react'
import { Badge, Button, Skeleton } from '@shadcn'
import { EmptyBannerLanding } from '@shared'
import PostCard from './components/PostCard'
import { useEffect } from 'react'
// import '@blocknote/mantine/style.css'

import { useCreateBlockNote } from '@blocknote/react'
import { BlockNoteView } from '@blocknote/mantine'
import { es } from '@blocknote/core/locales'
import '@blocknote/mantine/style.css'

const PostDetails = () => {
   const { postId } = useParams()
   const { post, isLoading, error } = useFetchPost({ postId })
   const { posts: allPosts } = useFetchPosts({
      onlyActive: true,
   })

   const editor = useCreateBlockNote({
      dictionary: es,
      editable: false,
   })

   // Obtener posts relacionados (misma categoría, excluyendo el actual)
   const relatedPosts = allPosts
      .filter((p) => p.id !== post?.id && p.category.id === post?.category.id)
      .slice(0, 3)

   // Actualizar el contenido del editor cuando se carga el post
   useEffect(() => {
      if (post && Array.isArray(post.content) && post.content.length > 0) {
         editor.replaceBlocks(editor.document, post.content)
      }
   }, [post, editor])

   if (isLoading) {
      return <PostDetailsSkeleton />
   }

   if (error || !post) {
      return (
         <div className="container py-15 md:py-20">
            <div className="max-w-4xl mx-auto">
               <EmptyBannerLanding
                  title="Post no encontrado"
                  description="El artículo que buscás no existe o ha sido eliminado."
               />
               <div className="mt-8 text-center">
                  <Button
                     asChild
                     variant="outline"
                     className="bg-white/80 backdrop-blur-sm border-silk-secondary/30 text-silk-secondary hover:bg-white/90"
                  >
                     <Link to={routesConfig.CLIENT_BLOG}>
                        <ArrowLeft size={16} className="mr-2" />
                        Volver al blog
                     </Link>
                  </Button>
               </div>
            </div>
         </div>
      )
   }

   return (
      <div className="container py-15 md:py-20">
         <div className="max-w-4xl mx-auto space-y-8">
            {/* Botón de volver */}
            <Button
               asChild
               variant="ghost"
               className="text-silk-secondary hover:text-silk-primary hover:bg-white/20 transition-colors"
            >
               <Link to={routesConfig.CLIENT_BLOG}>
                  <ArrowLeft size={16} className="mr-2" />
                  Volver al blog
               </Link>
            </Button>

            {/* Contenido principal del artículo */}
            <article className="space-y-8">
               {/* Imagen destacada */}
               {post.imageFilePath && (
                  <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden rounded-2xl shadow-xl">
                     <img
                        alt={post.title}
                        src={getPublicImageUrl(post.imageFilePath)}
                        className="w-full h-full object-cover"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                  </div>
               )}

               {/* Header del artículo */}
               <header className="text-center space-y-4">
                  {/* Título */}
                  <h1 className="font-very-vogue text-4xl md:text-5xl lg:text-6xl text-silk-secondary leading-tight">
                     {post.title}
                  </h1>

                  {/* Descripción */}
                  <p className="text-lg md:text-xl text-silk-secondary/80 max-w-3xl mx-auto leading-relaxed">
                     {post.description}
                  </p>

                  {/* Meta información */}
                  <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-silk-secondary/60 pt-4">
                     <div className="flex items-center gap-2">
                        <User size={16} />
                        <span>Por {post.author}</span>
                     </div>

                     <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span>{formatDateToShow(post.date, 'date')}</span>
                     </div>

                     {/* Categoría */}
                     <Badge
                        variant="default"
                        className="bg-silk-primary text-white border-none rounded-full uppercase tracking-wide text-sm px-4 py-1"
                     >
                        {post.category.name}
                     </Badge>
                  </div>
               </header>

               {/* Separador elegante */}
               {/* <div className="flex justify-center">
                  <div className="w-96 h-px bg-gradient-to-r from-transparent via-silk-secondary/30 to-transparent"></div>
               </div> */}

               {/* Contenido del post */}
               {Array.isArray(post.content) && post.content.length > 0 ? (
                  <BlockNoteView
                     data-headings-font
                     editor={editor}
                     theme={{
                        colors: {
                           editor: {
                              background: 'transparent',
                              text: '#161616',
                           },
                        },
                     }}
                     editable={false}
                     // className="
                     //    [&_.bn-editor]:px-0!
                     //    [&_h1]:text-silk-secondary
                     //    [&_h1]:text-3xl
                     //    [&_h1]:md:text-4xl
                     //    [&_h1]:font-very-vogue
                     //    [&_h1]:leading-relaxed
                     //    [&_h1]:mb-6
                     //    [&_h1]:mt-12
                     //    [&_h2]:text-silk-secondary!
                     //    [&_h2]:text-2xl
                     //    [&_h2]:md:text-3xl
                     //    [&_h2]:font-very-vogue
                     //    [&_h2]:tracking-wide!
                     //    [&_h2]:font-normal

                     //    [&_h3]:text-silk-secondary
                     //    [&_h3]:text-xl
                     //    [&_h3]:md:text-2xl
                     //    [&_h3]:font-semibold
                     //    [&_h3]:mb-3
                     //    [&_h3]:mt-8
                     //    [&_p]:text-gray-700
                     //    [&_p]:text-lg
                     //    [&_p]:leading-8
                     //    [&_p]:mb-6
                     //    [&_ul]:text-gray-700
                     //    [&_ul]:text-lg
                     //    [&_ul]:leading-8
                     //    [&_ol]:text-gray-700
                     //    [&_ol]:text-lg
                     //    [&_ol]:leading-8
                     //    [&_li]:mb-2
                     //    [&_blockquote]:border-l-4
                     //    [&_blockquote]:border-l-silk-primary
                     //    [&_blockquote]:bg-silk-primary/5
                     //    [&_blockquote]:text-silk-secondary
                     //    [&_blockquote]:italic
                     //    [&_blockquote]:pl-6
                     //    [&_blockquote]:py-4
                     //    [&_blockquote]:my-8
                     //    [&_blockquote]:rounded-r-lg
                     //    [&_strong]:text-silk-secondary
                     //    [&_strong]:font-semibold
                     //    [&_a]:text-silk-primary
                     //    [&_a]:hover:text-silk-primary/80
                     //    [&_a]:underline
                     //    [&_a]:transition-colors
                     // "
                  />
               ) : (
                  <div className="text-center py-16">
                     <p className="text-silk-secondary/60 text-lg">
                        Este artículo no tiene contenido disponible.
                     </p>
                  </div>
               )}
            </article>

            {/* Posts relacionados */}
            {relatedPosts.length > 0 && (
               <section className="space-y-6">
                  <div className="text-center">
                     <h3 className="font-very-vogue text-3xl text-silk-secondary mb-2">
                        Artículos relacionados
                     </h3>
                     <p className="text-silk-secondary/80">
                        Más contenido sobre {post.category.name.toLowerCase()}
                     </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                     {relatedPosts.map((relatedPost) => (
                        <PostCard key={relatedPost.id} post={relatedPost} />
                     ))}
                  </div>
               </section>
            )}

            {/* Call to action */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-silk-secondary/20 text-center">
               <h3 className="font-very-vogue text-2xl text-silk-secondary mb-4">
                  ¿Te gustó este artículo?
               </h3>
               <p className="text-silk-secondary/80 mb-6">
                  Descubrí más contenido sobre estilo y tendencias en nuestro blog
               </p>
               <Button
                  asChild
                  className="bg-silk-primary hover:bg-silk-primary/90 text-white"
               >
                  <Link to={routesConfig.CLIENT_BLOG}>Ver más artículos</Link>
               </Button>
            </div>
         </div>
      </div>
   )
}

const PostDetailsSkeleton = () => {
   return (
      <div className="container py-15 md:py-20">
         <div className="max-w-4xl mx-auto space-y-8">
            {/* Skeleton del botón volver */}
            <Skeleton className="h-10 w-32" />

            {/* Skeleton del artículo */}
            <article className="space-y-8">
               {/* Skeleton de la imagen */}
               <Skeleton className="h-64 md:h-80 lg:h-96 w-full rounded-2xl" />

               {/* Skeleton del header */}
               <header className="text-center space-y-4">
                  {/* Skeleton de la categoría */}
                  <Skeleton className="h-6 w-20 mx-auto rounded-full" />

                  {/* Skeleton del título */}
                  <div className="space-y-2">
                     <Skeleton className="h-12 md:h-16 w-full" />
                     <Skeleton className="h-12 md:h-16 w-3/4 mx-auto" />
                  </div>

                  {/* Skeleton de la descripción */}
                  <div className="space-y-2 max-w-3xl mx-auto">
                     <Skeleton className="h-6 w-full" />
                     <Skeleton className="h-6 w-2/3 mx-auto" />
                  </div>

                  {/* Skeleton de meta información */}
                  <div className="flex flex-wrap items-center justify-center gap-6 pt-4">
                     <Skeleton className="h-4 w-24" />
                     <Skeleton className="h-4 w-32" />
                     <Skeleton className="h-4 w-28" />
                  </div>
               </header>

               {/* Skeleton del separador */}
               <div className="flex justify-center">
                  <Skeleton className="w-24 h-px" />
               </div>

               {/* Skeleton del contenido */}
               <div className="prose prose-lg md:prose-xl max-w-none mx-auto space-y-6">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-5/6" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-2/3" />
               </div>
            </article>

            {/* Skeleton del call to action */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-silk-secondary/20 text-center">
               <Skeleton className="h-8 w-64 mx-auto mb-4" />
               <Skeleton className="h-4 w-96 mx-auto mb-6" />
               <Skeleton className="h-10 w-40 mx-auto" />
            </div>
         </div>
      </div>
   )
}

export default PostDetails

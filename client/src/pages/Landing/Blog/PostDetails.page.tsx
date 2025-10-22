import { ArrowLeft, Calendar, ChevronRight, User } from 'lucide-react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { formatDateToShow } from '@utils/formatDateToShow'
import { getPublicImageUrl } from '@utils/getPublicImage'
import { routesConfig } from '@config/routesConfig'
import { Badge, Button, Skeleton } from '@shadcn'
import { useFetchPost } from '@hooks/react-query'
import { EmptyBannerLanding } from '@shared'
import { useEffect } from 'react'

import { useCreateBlockNote } from '@blocknote/react'
import { BlockNoteView } from '@blocknote/mantine'
import { es } from '@blocknote/core/locales'
import '@blocknote/mantine/style.css'

const PostDetails = () => {
   const navigate = useNavigate()
   const { postId } = useParams()
   const { post, isLoading, error } = useFetchPost({ postId })

   const editor = useCreateBlockNote({
      dictionary: es,
      editable: false,
   })

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
                  description="El post que buscás no existe o ha sido eliminado."
               />
               <div className="mt-8 text-center">
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
               </div>
            </div>
         </div>
      )
   }

   return (
      <div className="container py-15 md:py-20">
         <div className="max-w-4xl mx-auto space-y-8">
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
               {post.imageFilePath && (
                  <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden rounded-lg shadow-xl">
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
                  <h1 className="font-very-vogue text-4xl md:text-5xl lg:text-6xl text-silk-secondary leading-tight">
                     {post.title}
                  </h1>

                  <p className="text-lg md:text-xl text-silk-secondary/80 max-w-3xl mx-auto leading-relaxed">
                     {post.description}
                  </p>

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

               {/* Contenido del post */}
               {Array.isArray(post.content) && post.content.length > 0 ? (
                  <BlockNoteView
                     data-headings-font
                     editable={false}
                     editor={editor}
                     theme={{
                        colors: {
                           editor: {
                              background: 'transparent',
                              text: '#161616',
                           },
                        },
                     }}
                  />
               ) : (
                  <div className="text-center py-16">
                     <p className="text-silk-secondary/60 text-lg">
                        Este artículo no tiene contenido disponible.
                     </p>
                  </div>
               )}
            </article>

            {/* Separador elegante */}
            <div className="flex justify-center">
               <div className="w-96 h-px bg-gradient-to-r from-transparent via-silk-secondary/30 to-transparent"></div>
            </div>

            {/* Call to action */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border-silk-secondary/20 text-center">
               <h3 className="font-very-vogue text-2xl text-silk-secondary mb-4">
                  ¿Te gustó este post?
               </h3>
               <p className="text-silk-secondary/80 mb-6">
                  Descubrí más contenido sobre estilo y tendencias en nuestro blog
               </p>

               <Button
                  onClick={() => navigate(routesConfig.CLIENT_BLOG)}
                  variant="primary"
                  size="lg"
                  className="group relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
               >
                  <span className="relative z-10 flex items-center">
                     Ir al Blog
                     <ChevronRight
                        className="ml-2 group-hover:translate-x-1 transition-transform duration-200"
                        size={19}
                     />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
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
               <Skeleton className="h-64 md:h-80 lg:h-96 w-full rounded-lg" />

               {/* Skeleton del header */}
               <header className="text-center space-y-4">
                  {/* Skeleton del título */}
                  <div className="space-y-3">
                     <Skeleton className="h-10 md:h-12 lg:h-16 w-full max-w-4xl mx-auto" />
                     <Skeleton className="h-10 md:h-12 lg:h-16 w-3/4 mx-auto" />
                  </div>

                  {/* Skeleton de la descripción */}
                  <div className="space-y-2 max-w-3xl mx-auto pt-2">
                     <Skeleton className="h-6 md:h-7 w-full" />
                     <Skeleton className="h-6 md:h-7 w-5/6 mx-auto" />
                  </div>

                  {/* Skeleton de meta información */}
                  <div className="flex flex-wrap items-center justify-center gap-6 pt-4">
                     <Skeleton className="h-4 w-20" />
                     <Skeleton className="h-4 w-24" />
                     <Skeleton className="h-6 w-16 rounded-full" />
                  </div>
               </header>

               {/* Skeleton del contenido del editor */}
               <div className="space-y-4 pt-4">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-4/5" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-5/6" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-2/3" />
               </div>
            </article>

            {/* Skeleton del separador elegante */}
            <div className="flex justify-center">
               <Skeleton className="w-96 h-px" />
            </div>

            {/* Skeleton del call to action */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p- text-center space-y-4">
               <Skeleton className="h-8 w-48 mx-auto" />
               <Skeleton className="h-5 w-80 mx-auto" />
               <Skeleton className="h-8 w-32 mx-auto rounded-lg" />
            </div>
         </div>
      </div>
   )
}

export default PostDetails

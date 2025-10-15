import { usePagination, useSearchAndSort, useMobile } from '@hooks'
import { useFetchPosts } from '@hooks/react-query'
import { FileText, Search } from 'lucide-react'
import PostCard from './components/PostCard'
import { Pagination } from '@shared'
import {
   Button,
   Input,
   Label,
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@shadcn'

const Blog = () => {
   const isMobile = useMobile()

   const {
      posts,
      categories,
      isLoading: isLoadingPosts,
   } = useFetchPosts({
      onlyActive: false,
   })

   const {
      items: filteredAndSortedPosts,
      searchTerm,
      setSearchTerm,
      filters,
      updateFilter,
      clearFilters,
      hasActiveFilters,
   } = useSearchAndSort({
      data: posts.map((post) => ({
         ...post,
         categoryName: post.category.name, // Flatten category name for search
      })),
      searchFields: ['title', 'author', 'description'],
      initialFilters: { categoryName: 'all' },
   })

   const {
      currentPage,
      totalPages,
      startIndex,
      endIndex,
      itemsPerPage,
      goToPage,
      canGoNext,
      canGoPrevious,
      setItemsPerPage,
   } = usePagination({
      totalItems: filteredAndSortedPosts.length,
      itemsPerPage: 6,
   })

   const paginatedPosts = filteredAndSortedPosts.slice(startIndex, endIndex)

   return (
      <section className="max-w-xs sm:max-w-xl lg:max-w-5xl mx-auto py-12">
         {/* Header */}
         <div className="text-center mb-8">
            <h1 className="font-very-vogue text-4xl md:text-5xl lg:text-6xl text-silk-secondary mb-4 leading-tight">
               Explorá nuestro <span className="italic font-light">blog</span>
            </h1>

            <p className="max-w-3xl text-lg md:text-xl text-silk-secondary/80 leading-relaxe mx-auto">
               Consejos de estilo, tendencias y secretos para potenciar tu imagen personal
            </p>
         </div>

         {/* Search and Filters */}
         <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-silk-secondary/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
               <div className="md:col-span-2">
                  <Label
                     htmlFor="search-filter"
                     className="text-silk-secondary font-medium"
                  >
                     Buscar por título, autor o descripción
                  </Label>
                  <div className="relative mt-2">
                     <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-silk-secondary/60" />
                     <Input
                        id="search-filter"
                        value={searchTerm}
                        disabled={isLoadingPosts}
                        className="pl-10 bg-white/80 backdrop-blur-sm border-silk-secondary/30 text-silk-secondary placeholder:text-silk-secondary/60"
                        placeholder="Ej: Tendencias en Colores..."
                        onChange={(e) => setSearchTerm(e.target.value)}
                     />
                  </div>
               </div>

               <div>
                  <Label
                     htmlFor="category-filter"
                     className="text-silk-secondary font-medium"
                  >
                     Categoría
                  </Label>
                  <Select
                     value={filters.categoryName || 'all'}
                     onValueChange={(value) => updateFilter('categoryName', value)}
                     disabled={isLoadingPosts}
                  >
                     <SelectTrigger
                        className="mt-2 bg-white/80 backdrop-blur-sm border-silk-secondary/30 text-silk-secondary w-full"
                        id="category-filter"
                     >
                        <SelectValue placeholder="Todas las categorías" />
                     </SelectTrigger>

                     <SelectContent>
                        <SelectItem value="all">Todas las categorías</SelectItem>
                        {Object.keys(categories).map((categoryId) => (
                           <SelectItem key={categoryId} value={categories[categoryId]}>
                              {categories[categoryId]}
                           </SelectItem>
                        ))}
                     </SelectContent>
                  </Select>
               </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
               <div className="text-sm text-silk-secondary/80">
                  {paginatedPosts.length === 0
                     ? 'No se encontraron posts'
                     : `Mostrando ${startIndex + 1}-${Math.min(
                          endIndex,
                          filteredAndSortedPosts.length
                       )} de ${filteredAndSortedPosts.length} posts`}
               </div>

               <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                     <Label
                        htmlFor="items-per-page"
                        className="text-sm text-silk-secondary/80 whitespace-nowrap"
                     >
                        Mostrar:
                     </Label>
                     <Select
                        value={itemsPerPage.toString()}
                        disabled={isLoadingPosts}
                        onValueChange={(v) =>
                           setItemsPerPage(v === '*' ? '*' : Number(v))
                        }
                     >
                        <SelectTrigger
                           id="items-per-page"
                           className="w-20 bg-white/80 backdrop-blur-sm border-silk-secondary/30 text-silk-secondary"
                        >
                           <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                           <SelectItem value="3">3</SelectItem>
                           <SelectItem value="6">6</SelectItem>
                           <SelectItem value="12">12</SelectItem>
                           <SelectItem value="*">Todos</SelectItem>
                        </SelectContent>
                     </Select>
                  </div>

                  <Button
                     variant="secondary"
                     onClick={clearFilters}
                     disabled={isLoadingPosts || !hasActiveFilters}
                     className="bg-white/80 backdrop-blur-sm border-silk-secondary/30 text-silk-secondary hover:bg-white/90"
                  >
                     {isMobile ? 'Limpiar' : 'Limpiar filtros'}
                  </Button>
               </div>
            </div>
         </div>

         {/* Posts Grid */}
         {isLoadingPosts ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
               {Array.from({ length: 6 }).map((_, index) => (
                  <PostCard.Skeleton key={`post-skeleton-${index}`} />
               ))}
            </div>
         ) : paginatedPosts.length === 0 ? (
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-12 border border-silk-secondary/20 text-center">
               <FileText size={80} className="mx-auto text-silk-secondary/60 mb-4" />
               <h3 className="font-very-vogue text-2xl text-silk-secondary mb-2">
                  {hasActiveFilters
                     ? 'No hay posts que coincidan'
                     : 'Aún no hay posts publicados'}
               </h3>
               <p className="text-silk-secondary/80">
                  {hasActiveFilters
                     ? 'Probá limpiar los filtros o buscar con otros términos'
                     : 'Pronto tendremos contenido increíble para vos'}
               </p>
            </div>
         ) : (
            <>
               {totalPages > 1 && !isLoadingPosts && (
                  <div className="mb-2">
                     <Pagination
                        isLanding
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={goToPage}
                        canGoNext={canGoNext}
                        canGoPrevious={canGoPrevious}
                     />
                  </div>
               )}

               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  {paginatedPosts.map((post, index) => (
                     <PostCard key={`post-card-client-${post.id}-${index}`} post={post} />
                  ))}
               </div>
            </>
         )}

         {totalPages > 1 && !isLoadingPosts && (
            <Pagination
               isLanding
               currentPage={currentPage}
               totalPages={totalPages}
               onPageChange={goToPage}
               canGoNext={canGoNext}
               canGoPrevious={canGoPrevious}
            />
         )}
      </section>
   )
}

export default Blog

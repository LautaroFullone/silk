import { usePagination, useSearchAndSort, useMobile } from '@hooks'
import { useFetchPosts } from '@hooks/react-query'
import { FileText, Search } from 'lucide-react'
import PostCard from './components/PostCard'
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
import {
   Pagination,
   PaginationContent,
   PaginationItem,
   PaginationLink,
   PaginationNext,
   PaginationPrevious,
} from '@shadcn/pagination'

const Blog = () => {
   const isMobile = useMobile()

   // Fetch posts from API - only active posts for public view
   const {
      posts: activePosts,
      categories,
      isLoading: isLoadingPosts,
   } = useFetchPosts({
      onlyActive: false,
   })

   // Search and filter functionality
   const {
      items: searchResults,
      searchTerm,
      setSearchTerm,
      filters,
      updateFilter,
      clearFilters,
      hasActiveFilters,
   } = useSearchAndSort({
      data: activePosts.map((post) => ({
         ...post,
         categoryName: post.category.name, // Flatten category name for search
      })),
      searchFields: ['title', 'author', 'description'],
      initialFilters: { category: 'all' },
   })

   // Apply category filter manually since it's a nested object
   const filteredAndSortedPosts = searchResults.filter((post) => {
      if (filters.category === 'all' || !filters.category) return true
      return post.category.name === filters.category
   })

   // Pagination
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
      itemsPerPage: 10,
   })

   const paginatedPosts = filteredAndSortedPosts.slice(startIndex, endIndex)

   // Get unique categories for filter
   const uniqueCategories = Object.keys(categories || {})

   if (isLoadingPosts) {
      return (
         <div className="bg-silk-tertiary min-h-screen">
            <div className="min-h-dvh flex flex-col items-center justify-center px-4">
               <div className="max-w-2xl mx-auto text-center">
                  <h1 className="font-very-vogue text-4xl md:text-5xl lg:text-6xl text-silk-secondary mb-6 leading-tight">
                     Cargando
                     <br />
                     <span className="italic font-light">blog...</span>
                  </h1>
                  <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-silk-secondary/20">
                     <div className="w-full bg-silk-secondary/20 rounded-full h-2">
                        <div className="bg-gradient-to-r from-silk-secondary to-silk-primary h-2 rounded-full w-3/4 animate-pulse"></div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      )
   }

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
                     Buscar por título, autor o categoría
                  </Label>
                  <div className="relative mt-2">
                     <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-silk-secondary/60" />
                     <Input
                        id="search-filter"
                        value={searchTerm}
                        disabled={isLoadingPosts}
                        className="pl-10 bg-white/80 backdrop-blur-sm border-silk-secondary/30 text-silk-secondary placeholder:text-silk-secondary/60"
                        placeholder="Ej: Tendencias de Moda, Colores..."
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
                     value={filters.category || 'all'}
                     onValueChange={(value) => updateFilter('category', value)}
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
                        {uniqueCategories.map((categoryName) => (
                           <SelectItem key={categoryName} value={categoryName}>
                              {categories[categoryName]}
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
                        onValueChange={(v) => setItemsPerPage(Number(v))}
                     >
                        <SelectTrigger
                           id="items-per-page"
                           className="w-20 bg-white/80 backdrop-blur-sm border-silk-secondary/30 text-silk-secondary"
                        >
                           <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                           <SelectItem value="5">5</SelectItem>
                           <SelectItem value="10">10</SelectItem>
                           <SelectItem value="25">25</SelectItem>
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
         {paginatedPosts.length === 0 ? (
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
               {paginatedPosts.map((post, index) => (
                  <PostCard key={`post-card-client-${post.id}-${index}`} post={post} />
               ))}
            </div>
         )}

         {/* Pagination */}
         {totalPages > 1 && (
            <div className="flex justify-center">
               <Pagination>
                  <PaginationContent className="cursor-pointer select-none">
                     <PaginationItem>
                        <PaginationPrevious
                           onClick={() => canGoPrevious && goToPage(currentPage - 1)}
                           className={`${
                              canGoPrevious
                                 ? 'text-silk-secondary hover:text-silk-primary'
                                 : 'text-silk-secondary/40 cursor-not-allowed'
                           }`}
                        />
                     </PaginationItem>

                     {!isMobile &&
                        Array.from({ length: totalPages }, (_, i) => i + 1).map(
                           (page) => (
                              <PaginationItem key={page}>
                                 <PaginationLink
                                    onClick={() => goToPage(page)}
                                    isActive={currentPage === page}
                                    className={
                                       currentPage === page
                                          ? 'bg-silk-secondary text-white'
                                          : 'text-silk-secondary hover:text-silk-primary'
                                    }
                                 >
                                    {page}
                                 </PaginationLink>
                              </PaginationItem>
                           )
                        )}

                     {isMobile && (
                        <PaginationItem>
                           <span className="text-sm text-silk-secondary">
                              Página {currentPage} de {totalPages}
                           </span>
                        </PaginationItem>
                     )}

                     <PaginationItem>
                        <PaginationNext
                           onClick={() => canGoNext && goToPage(currentPage + 1)}
                           className={`${
                              canGoNext
                                 ? 'text-silk-secondary hover:text-silk-primary'
                                 : 'text-silk-secondary/40 cursor-not-allowed'
                           }`}
                        />
                     </PaginationItem>
                  </PaginationContent>
               </Pagination>
            </div>
         )}
      </section>
   )
}

export default Blog

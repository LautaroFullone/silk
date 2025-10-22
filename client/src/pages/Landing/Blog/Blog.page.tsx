import { usePagination, useSearchAndSort, useMobile } from '@hooks'
import PostsTableSection from './components/PostsTableSection'
import { useFetchPosts } from '@hooks/react-query'
import { PageTitleLanding } from '@shared'
import { Search } from 'lucide-react'
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
      items: filteredPosts,
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
      totalItems: filteredPosts.length,
      itemsPerPage: 6,
   })

   const paginatedPosts = filteredPosts.slice(startIndex, endIndex)

   return (
      <div className="container py-15 md:py-20 space-y-10">
         <PageTitleLanding
            title={
               <>
                  Explorá nuestro <span className="italic">blog</span>
               </>
            }
            description="Consejos de estilo, tendencias y secretos para potenciar tu imagen personal"
         />

         <section className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-silk-secondary/20">
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
                     ? 'Mostrando 0 de 0 posts'
                     : `Mostrando ${startIndex + 1}-${Math.min(
                          endIndex,
                          filteredPosts.length
                       )} de ${filteredPosts.length} posts`}
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
         </section>

         <PostsTableSection
            paginatedPosts={paginatedPosts}
            isLoading={isLoadingPosts}
            currentPage={currentPage}
            totalPages={totalPages}
            canGoNext={canGoNext}
            canGoPrevious={canGoPrevious}
            onPageChange={goToPage}
            emptyMessage={
               hasActiveFilters
                  ? 'Probá limpiar los filtros o buscar con otros términos'
                  : 'Pronto tendremos contenido increíble para vos'
            }
         />
      </div>
   )
}

export default Blog

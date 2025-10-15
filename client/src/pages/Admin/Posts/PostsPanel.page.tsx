import { usePagination, useSearchAndSort } from '@hooks'
import { FileText, Plus, Search } from 'lucide-react'
import { routesConfig } from '@config/routesConfig'
import { useFetchPosts } from '@hooks/react-query'
import { ActionButton, PageTitle } from '@shared'
import PostsTable from './components/PostsTable'
import { useNavigate } from 'react-router-dom'
import {
   Button,
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
   Input,
   Label,
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@shadcn'

const PostsPanel = () => {
   const navigate = useNavigate()

   const { posts, isLoading: isLoadingPosts } = useFetchPosts({ onlyActive: false })

   const {
      items: filteredAndSortedPosts,
      searchTerm,
      setSearchTerm,
      filters,
      updateFilter,
      clearFilters,
      hasActiveFilters,
   } = useSearchAndSort({
      data: posts || [],
      searchFields: ['title', 'author', 'category'],
      initialFilters: { isActive: 'all' },
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
      itemsPerPage: 10,
   })

   const paginatedPosts = filteredAndSortedPosts.slice(startIndex, endIndex)

   return (
      <>
         <div className="flex justify-between items-center gap-2">
            <PageTitle
               title="Gestión de Posts"
               description="Crea y administra el contenido de los posts"
            />

            <ActionButton
               size="lg"
               icon={Plus}
               variant="primary"
               label="Nuevo Post"
               className="hidden md:flex"
               onClick={() => navigate(routesConfig.ADMIN_POST_NEW)}
            />
         </div>

         <ActionButton
            size="lg"
            icon={Plus}
            variant="primary"
            label="Nuevo Post"
            onClick={() => navigate(routesConfig.ADMIN_POST_NEW)}
            className="md:hidden w-full"
         />

         <Card>
            <CardHeader>
               <CardTitle className="flex items-center gap-2">
                  <FileText className="size-5 text-emerald-800" />
                  Listado de Posts
               </CardTitle>
               <CardDescription>Filtrá por Título, Autor y/o Categoría</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                     <Label htmlFor="search-filter">
                        Buscar por Título, Autor o Categoría
                     </Label>

                     <div className="relative mt-1">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                           id="search-filter"
                           value={searchTerm}
                           disabled={isLoadingPosts}
                           className="pl-8 bg-white"
                           placeholder="Ej: Tendencias de Moda"
                           onChange={(e) => setSearchTerm(e.target.value)}
                        />
                     </div>
                  </div>

                  <div>
                     <Label htmlFor="highlight-filter">Estado</Label>
                     <Select
                        value={filters.isActive || 'all'}
                        onValueChange={(value) => updateFilter('isActive', value)}
                        disabled={isLoadingPosts}
                     >
                        <SelectTrigger className="mt-1 w-full" id="highlight-filter">
                           <SelectValue placeholder="Todos" />
                        </SelectTrigger>

                        <SelectContent>
                           <SelectItem value="all">Todos</SelectItem>
                           <SelectItem value="true">Publicado</SelectItem>
                           <SelectItem value="false">Borrador</SelectItem>
                        </SelectContent>
                     </Select>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-center justify-between col-span-full gap-4">
                     <div className="text-sm text-gray-600">
                        {paginatedPosts.length === 0
                           ? 'Mostrando 0 de 0 posts'
                           : `Mostrando ${startIndex + 1}-${Math.min(
                                endIndex,
                                paginatedPosts.length
                             )} de ${paginatedPosts.length} posts`}
                     </div>

                     <div className="flex items-center gap-4 justify-between">
                        <div className="flex items-center gap-2">
                           <Label
                              htmlFor="items-per-page"
                              className="text-sm whitespace-nowrap"
                           >
                              Mostrar:
                           </Label>

                           <Select
                              value={itemsPerPage.toString()}
                              disabled={isLoadingPosts}
                              onValueChange={(v) => setItemsPerPage(Number(v))}
                           >
                              <SelectTrigger id="items-per-page">
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
                           variant="default"
                           onClick={clearFilters}
                           disabled={isLoadingPosts || !hasActiveFilters}
                        >
                           Limpiar Filtros
                        </Button>
                     </div>
                  </div>
               </div>

               <PostsTable
                  paginatedPosts={paginatedPosts}
                  isLoading={isLoadingPosts}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  canGoNext={canGoNext}
                  canGoPrevious={canGoPrevious}
                  onPageChange={goToPage}
                  emptyMessage={
                     hasActiveFilters
                        ? `No hay posts que coincidan con los filtros, probá limpiarlos o intentá con otros términos de búsqueda`
                        : 'Hacé clic en "Nuevo Post" para crear el primero'
                  }
               />
            </CardContent>
         </Card>
      </>
   )
}
export default PostsPanel

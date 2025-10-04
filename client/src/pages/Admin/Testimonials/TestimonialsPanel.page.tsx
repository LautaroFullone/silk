import { useFetchTestimonials, usePagination, useSearchAndSort } from '@hooks'
import TestimonialsTable from './components/TestimonialsTable'
import { routesConfig } from '@config/routesConfig'
import { ActionButton, PageTitle } from '@shared'
import { useNavigate } from 'react-router-dom'
import { Plus, Search } from 'lucide-react'
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

const TestimonialsPanel = () => {
   const navigate = useNavigate()
   const { testimonials, isLoading: isLoadingTestimonials } = useFetchTestimonials()

   const {
      items: filteredTestimonials,
      searchTerm,
      setSearchTerm,
      filters,
      updateFilter,
      clearFilters,
      hasActiveFilters,
   } = useSearchAndSort({
      data: testimonials,
      searchFields: ['personName', 'personRole'],
      sortableFields: ['personName', 'personRole', 'isHighlight'],
      initialFilters: { isHighlight: 'all' },
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
      totalItems: filteredTestimonials.length,
      itemsPerPage: 10,
   })

   const paginatedTestimonials = filteredTestimonials.slice(startIndex, endIndex)

   return (
      <>
         <div className="flex justify-between items-center gap-2">
            <PageTitle
               title="Gestión de Testimonios"
               description="Administrá los testimonios de la web"
            />

            <ActionButton
               size="lg"
               icon={Plus}
               variant="primary"
               label="Nuevo Testimonio"
               className="hidden md:flex"
               onClick={() => navigate(routesConfig.ADMIN_TESTIMONIAL_NEW)}
            />
         </div>

         <ActionButton
            size="lg"
            icon={Plus}
            variant="primary"
            label="Nuevo Testimonio"
            onClick={() => navigate(routesConfig.ADMIN_TESTIMONIAL_NEW)}
            className="md:hidden w-full"
         />

         <Card>
            <CardHeader>
               <CardTitle className="flex items-center gap-2">
                  Listado de Testimonios
               </CardTitle>

               <CardDescription>Filtrá por Nombre, Rol y/o estado</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                     <Label htmlFor="search-filter">Buscar por Nombre o Rol</Label>

                     <div className="relative mt-1">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                           id="search-filter"
                           value={searchTerm}
                           disabled={isLoadingTestimonials}
                           className="pl-8 bg-white"
                           placeholder="Ej: Germán Beder"
                           onChange={(e) => setSearchTerm(e.target.value)}
                        />
                     </div>
                  </div>

                  <div>
                     <Label htmlFor="highlight-filter">Estado</Label>
                     <Select
                        value={filters.isHighlight || 'all'}
                        onValueChange={(value: string) =>
                           updateFilter('isHighlight', value)
                        }
                        disabled={isLoadingTestimonials}
                     >
                        <SelectTrigger className="mt-1 w-full" id="highlight-filter">
                           <SelectValue placeholder="Todos" />
                        </SelectTrigger>

                        <SelectContent>
                           <SelectItem value="all">Todos</SelectItem>
                           <SelectItem value="true">Destacado</SelectItem>
                           <SelectItem value="false">No Destacado</SelectItem>
                        </SelectContent>
                     </Select>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-center justify-between col-span-full gap-4">
                     <div className="text-sm text-gray-600">
                        {paginatedTestimonials.length === 0
                           ? 'Mostrando 0 de 0 testimonios'
                           : `Mostrando ${startIndex + 1}-${Math.min(
                                endIndex,
                                paginatedTestimonials.length
                             )} de ${paginatedTestimonials.length} testimonios`}
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
                              disabled={isLoadingTestimonials}
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
                           disabled={isLoadingTestimonials || !hasActiveFilters}
                        >
                           Limpiar Filtros
                        </Button>
                     </div>
                  </div>
               </div>

               <TestimonialsTable
                  paginatedTestimonials={paginatedTestimonials}
                  isLoading={isLoadingTestimonials}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  canGoNext={canGoNext}
                  canGoPrevious={canGoPrevious}
                  onPageChange={goToPage}
                  emptyMessage={
                     hasActiveFilters
                        ? `No hay testimonios que coincidan con los filtros, probá limpiarlos o intentá con otros términos de búsqueda`
                        : 'Hacé clic en "Nuevo Testimonio" para crear el primero'
                  }
               />
            </CardContent>
         </Card>
      </>
   )
}
export default TestimonialsPanel

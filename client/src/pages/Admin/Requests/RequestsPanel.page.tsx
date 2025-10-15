import { useFetchRequests, usePagination, useSearchAndSort } from '@hooks'
import { requestStatusConfig } from '@config/requestStatusConfig'
import RequestsTable from './components/RequestsTable'
import { ClipboardList, Search } from 'lucide-react'
import { PageTitle } from '@shared'
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

const RequestsPanel = () => {
   const { requests, isLoading: isLoadingRequests } = useFetchRequests()

   const {
      items: filteredRequests,
      searchTerm,
      setSearchTerm,
      filters,
      updateFilter,
      clearFilters,
      hasActiveFilters,
   } = useSearchAndSort({
      data: requests,
      searchFields: ['name', 'email', 'budget'],
      initialFilters: { status: 'all' },
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
      totalItems: filteredRequests.length,
      itemsPerPage: 10,
   })

   const paginatedRequests = filteredRequests.slice(startIndex, endIndex)

   return (
      <>
         <PageTitle
            title="Gestión de Solicitudes"
            description="Visualizá y administrá las respuestas recibidas del formulario de captación."
         />

         <Card>
            <CardHeader>
               <CardTitle className="flex items-center gap-2">
                  <ClipboardList className="size-5 text-emerald-800" />
                  Listado de Solicitudes
               </CardTitle>

               <CardDescription>
                  Filtrá por Nombre, Email, Servicio y/o estado
               </CardDescription>
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
                           disabled={false}
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
                        disabled={isLoadingRequests}
                     >
                        <SelectTrigger className="mt-1 w-full" id="highlight-filter">
                           <SelectValue placeholder="Todos" />
                        </SelectTrigger>

                        <SelectContent>
                           <SelectItem value="all">Todos</SelectItem>
                           {Object.entries(requestStatusConfig).map(
                              ([status, { label }]) => (
                                 <SelectItem key={status} value={status}>
                                    {label}
                                 </SelectItem>
                              )
                           )}
                        </SelectContent>
                     </Select>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-center justify-between col-span-full gap-4">
                     <div className="text-sm text-gray-600">
                        {paginatedRequests.length === 0
                           ? 'Mostrando 0 de 0 solicitudes'
                           : `Mostrando ${startIndex + 1}-${Math.min(
                                endIndex,
                                filteredRequests.length
                             )} de ${filteredRequests.length} solicitudes`}
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
                              disabled={isLoadingRequests}
                              onValueChange={(v) =>
                                 setItemsPerPage(v === '*' ? '*' : Number(v))
                              }
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
                           disabled={isLoadingRequests || !hasActiveFilters}
                        >
                           Limpiar Filtros
                        </Button>
                     </div>
                  </div>
               </div>

               <RequestsTable
                  paginatedRequests={paginatedRequests}
                  isLoading={isLoadingRequests}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  canGoNext={canGoNext}
                  canGoPrevious={canGoPrevious}
                  onPageChange={goToPage}
                  emptyMessage={
                     hasActiveFilters
                        ? `No hay solicitudes que coincidan con los filtros, probá limpiarlos o intentá con otros términos de búsqueda`
                        : 'Esperá la primera solicitud a través del formulario de captación'
                  }
               />
            </CardContent>
         </Card>
      </>
   )
}
export default RequestsPanel

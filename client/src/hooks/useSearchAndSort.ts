import { useMemo, useState } from 'react'
import { useDebounce } from './useDebounce'

type SortOrder = 'asc' | 'desc'

interface HookProps<T> {
   data: T[]
   searchableFields: (keyof T)[]
   sortableFields: (keyof T)[]
   filterField?: keyof T // Campo por el que se va a filtrar (opcional)
}

/**
 * Se encarga de buscar y ordenar una lista de objetos.
 * Permite buscar en varios campos, ordenar por varios campos y filtrar por un campo específico.
 * @param data Lista de objetos a buscar y ordenar
 * @param searchableFields Campos en los que se puede buscar
 * @param sortableFields Campos por los que se puede ordenar
 * @param filterField Campo por el que se puede filtrar (opcional)
 * @returns Un objeto con el término de búsqueda, campo de orden, orden, valor de filtro y la lista filtrada
 */
const useSearchAndSort = <T>({
   data,
   searchableFields,
   sortableFields,
   filterField,
}: HookProps<T>) => {
   const [searchTerm, setSearchTerm] = useState('')
   const [sortBy, setSortBy] = useState<keyof T>(sortableFields[0])
   const [sortOrder, setSortOrder] = useState<SortOrder>('asc')
   const [filterValue, setFilterValue] = useState<string>('all') // valor por defecto

   // Aplicar debounce al término de búsqueda
   const debouncedSearchTerm = useDebounce(searchTerm, 400)

   const filteredData = useMemo(() => {
      const lowerSearch = debouncedSearchTerm.toLowerCase()

      let filtered = data.filter((item) =>
         searchableFields.some((field) => {
            const value = item[field]
            return typeof value === 'string' && value.toLowerCase().includes(lowerSearch)
         })
      )

      if (filterField && filterValue !== 'all') {
         filtered = filtered.filter((item) => String(item[filterField]) === filterValue)
      }

      filtered = filtered.sort((a, b) => {
         const av = a[sortBy]
         const bv = b[sortBy]

         if (typeof av === 'string' && typeof bv === 'string') {
            return sortOrder === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av)
         }
         if (typeof av === 'number' && typeof bv === 'number') {
            return sortOrder === 'asc' ? av - bv : bv - av
         }
         if (av instanceof Date && bv instanceof Date) {
            return sortOrder === 'asc'
               ? av.getTime() - bv.getTime()
               : bv.getTime() - av.getTime()
         }
         return 0
      })

      return filtered
   }, [
      data,
      debouncedSearchTerm,
      filterValue,
      filterField,
      sortBy,
      sortOrder,
      searchableFields,
   ])

   const toggleSortOrder = () => setSortOrder((s) => (s === 'asc' ? 'desc' : 'asc'))

   return {
      searchTerm,
      setSearchTerm,
      sortBy,
      setSortBy,
      sortOrder,
      toggleSortOrder,
      filterValue,
      setFilterValue,
      filteredData,
   }
}

export default useSearchAndSort

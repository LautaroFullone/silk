import { useMemo, useState } from 'react'
import useDebounce from './useDebounce'

type SortOrder = 'asc' | 'desc'

interface UseSearchAndSortProps<T> {
   data: T[]
   searchFields: (keyof T)[]
   sortableFields: (keyof T)[]
   initialFilters?: Record<string, string>
   defaultSort?: {
      field?: keyof T
      order?: SortOrder
   }
}

/**
 * Hook para búsqueda, filtrado y ordenado de datos
 * Separado de la paginación para mayor flexibilidad
 * @param data Lista de datos a procesar
 * @param searchFields Campos a considerar en la búsqueda
 * @param sortableFields Campos que se pueden ordenar
 * @param initialFilters Filtros iniciales (por defecto ninguno)
 * @param defaultSort Ordenamiento por defecto (campo y orden)
 * @returns Objetos y funciones para manejar búsqueda, filtros y ordenado
 */
const useSearchAndSort = <T>({
   data,
   searchFields,
   sortableFields,
   initialFilters = {},
   defaultSort = {},
}: UseSearchAndSortProps<T>) => {
   const [searchTerm, setSearchTerm] = useState('')
   const [filters, setFilters] = useState<Record<string, string>>(initialFilters)
   const [sortBy, setSortBy] = useState<keyof T>(defaultSort.field || sortableFields[0])
   const [sortOrder, setSortOrder] = useState<SortOrder>(defaultSort.order || 'desc')

   const debouncedSearch = useDebounce(searchTerm, 400)

   const normalizeString = (str: string): string => {
      return str
         .toLowerCase()
         .normalize('NFD')
         .replace(/[\u0300-\u036f]/g, '')
         .trim()
   }

   const processedData = useMemo(() => {
      const normalizedSearch = normalizeString(debouncedSearch)

      // Filtrar por búsqueda
      const filtered = data.filter((item) => {
         const matchesSearch =
            normalizedSearch.length === 0 ||
            searchFields.some((field) => {
               const value = item[field]
               return (
                  typeof value === 'string' &&
                  normalizeString(value).includes(normalizedSearch)
               )
            })

         const matchesFilters = Object.entries(filters).every(([key, value]) => {
            if (value === 'all') return true
            const itemValue = item[key as keyof T]
            return String(itemValue) === value
         })

         return matchesSearch && matchesFilters
      })

      // Ordenar
      filtered.sort((a, b) => {
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
   }, [data, debouncedSearch, filters, searchFields, sortBy, sortOrder])

   const updateFilter = (key: string, value: string) => {
      setFilters((prev) => ({ ...prev, [key]: value }))
   }

   const clearFilters = () => {
      setSearchTerm('')
      setFilters(initialFilters)
   }

   const toggleSortOrder = () => {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
   }

   const hasActiveFilters =
      searchTerm.length > 0 ||
      Object.entries(filters).some(([, value]) => value !== 'all')

   return {
      // Datos
      items: processedData,
      totalItems: processedData.length,

      // Búsqueda
      searchTerm,
      setSearchTerm,

      // Filtros
      filters,
      updateFilter,
      clearFilters,
      hasActiveFilters,

      // Ordenado
      sortBy,
      setSortBy,
      sortOrder,
      toggleSortOrder,
   }
}

export default useSearchAndSort

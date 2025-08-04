import { useState, useMemo } from 'react'

type SortOrder = 'asc' | 'desc'

interface HookProps<T> {
   data: T[]
   searchableFields: (keyof T)[]
   sortableFields: (keyof T)[]
}

const useSearchAndSort = <T>({
   data,
   searchableFields,
   sortableFields,
}: HookProps<T>) => {
   const [searchTerm, setSearchTerm] = useState('')
   const [sortBy, setSortBy] = useState<keyof T>(sortableFields[0])
   const [sortOrder, setSortOrder] = useState<SortOrder>('asc')

   // Filtrado y ordenamiento memorizados
   const filteredData = useMemo(() => {
      // Filtro por searchTerm
      const lowerSearch = searchTerm.toLowerCase()
      let filtered = data.filter((item) =>
         searchableFields.some((field) => {
            const value = item[field]
            if (typeof value === 'string')
               return value.toLowerCase().includes(lowerSearch)
            return false
         })
      )

      // Ordenamiento
      filtered = filtered.sort((a, b) => {
         const aValue = a[sortBy]
         const bValue = b[sortBy]
         if (typeof aValue === 'string' && typeof bValue === 'string') {
            return sortOrder === 'asc'
               ? aValue.localeCompare(bValue)
               : bValue.localeCompare(aValue)
         }
         if (typeof aValue === 'number' && typeof bValue === 'number') {
            return sortOrder === 'asc' ? aValue - bValue : bValue - aValue
         }
         if (aValue instanceof Date && bValue instanceof Date) {
            return sortOrder === 'asc'
               ? aValue.getTime() - bValue.getTime()
               : bValue.getTime() - aValue.getTime()
         }
         return 0
      })

      return filtered
   }, [data, searchTerm, sortBy, sortOrder, searchableFields])

   // Alterna entre 'asc' y 'desc'
   const toggleSortOrder = () => setSortOrder((s) => (s === 'asc' ? 'desc' : 'asc'))

   return {
      searchTerm,
      setSearchTerm,
      sortBy,
      setSortBy,
      sortOrder,
      toggleSortOrder,
      filteredData,
   }
}

export default useSearchAndSort

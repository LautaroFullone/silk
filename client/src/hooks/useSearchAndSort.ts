import { useMemo, useState } from 'react'

type SortOrder = 'asc' | 'desc'

interface HookProps<T> {
   data: T[]
   searchableFields: (keyof T)[]
   sortableFields: (keyof T)[]
   filterField?: keyof T // Campo por el que se va a filtrar (opcional)
}

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

   const filteredData = useMemo(() => {
      const lowerSearch = searchTerm.toLowerCase()

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
   }, [data, searchTerm, filterValue, filterField, sortBy, sortOrder, searchableFields])

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

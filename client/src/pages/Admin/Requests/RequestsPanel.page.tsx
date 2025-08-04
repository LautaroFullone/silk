import useSearchAndSort from '@hooks/useSearchAndSort'
import AdminTitle from '@shared/AdminTitle'
import {
   Button,
   Input,
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@shadcn'
import { ArrowUpDown, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'
import { ServiceRequest } from '@models/Request.model'
import RequestsTable from './components/RequestsTable'

const mockRequest: ServiceRequest[] = [
   {
      id: 'REQ-001',
      name: 'María González',
      email: 'maria.gonzalez@email.com',
      phone: '+34 612 345 678',
      age: 32,
      date: '2025-01-15',
      services: ['Consultoría de Imagen Ejecutiva', 'Análisis de Color Personal'],
      budget: '$1.500.000',
      status: 'pending',
      formData: {
         occupation: 'Directora de Marketing',
         location: 'Madrid, España',
         goals: 'Mejorar mi imagen profesional para presentaciones importantes',
         experience: 'Primera vez con consultoría de imagen',
         preferences: 'Estilo clásico y elegante',
         availability: 'Fines de semana',
         additionalInfo: 'Tengo una presentación importante en 3 semanas',
      },
   },
   {
      id: 'REQ-002',
      name: 'Carlos Rodríguez',
      email: 'carlos.rodriguez@email.com',
      phone: '+34 687 654 321',
      age: 28,
      date: '2025-01-14',
      services: ['Transformación Completa'],
      budget: '$2.000.000',
      status: 'contacted',
      formData: {
         occupation: 'Emprendedor',
         location: 'Barcelona, España',
         goals: 'Cambio completo de imagen para nueva etapa profesional',
         experience: 'He trabajado con estilistas antes',
         preferences: 'Moderno y sofisticado',
         availability: 'Entre semana por las tardes',
         additionalInfo: 'Acabo de fundar mi startup y necesito proyectar confianza',
      },
   },
   {
      id: 'REQ-003',
      name: 'Ana Martínez',
      email: 'ana.martinez@email.com',
      phone: '+34 654 987 321',
      age: 45,
      date: '2025-01-13',
      services: ['Consultoría Virtual'],
      budget: '$500.000',
      status: 'completed',
      formData: {
         occupation: 'Consultora de Negocios',
         location: 'Valencia, España',
         goals: 'Optimizar mi guardarropa actual',
         experience: 'Segunda consultoría',
         preferences: 'Práctico y versátil',
         availability: 'Flexible',
         additionalInfo: 'Trabajo desde casa pero tengo reuniones frecuentes por video',
      },
   },
   {
      id: 'REQ-004',
      name: 'Luis Fernández',
      email: 'luis.fernandez@email.com',
      phone: '+34 698 123 456',
      age: 38,
      date: '2025-01-12',
      services: [
         'Análisis de Color Personal',
         'Consultoría de Imagen Ejecutiva',
         'Consultoría de Imagen Ejecutiva',
      ],
      budget: '$1.200.000',
      status: 'pending',
      formData: {
         occupation: 'Abogado',
         location: 'Sevilla, España',
         goals: 'Renovar mi imagen para el bufete',
         experience: 'Nunca he tenido consultoría profesional',
         preferences: 'Conservador pero actual',
         availability: 'Sábados por la mañana',
         additionalInfo: 'Soy socio del bufete y necesito proyectar autoridad',
      },
   },
   {
      id: 'REQ-005',
      name: 'Elena Ruiz',
      email: 'elena.ruiz@email.com',
      phone: '+34 611 222 333',
      age: 29,
      date: '2025-01-11',
      services: ['Análisis de Color Personal'],
      budget: '$750.000',
      status: 'cancelled',
      formData: {
         occupation: 'Diseñadora Gráfica',
         location: 'Bilbao, España',
         goals: 'Encontrar mi paleta de colores perfecta',
         experience: 'Primera consultoría',
         preferences: 'Creativo y único',
         availability: 'Tardes entre semana',
         additionalInfo: 'Trabajo en una agencia creativa',
      },
   },
]

const RequestsPanel = () => {
   const [requests, setRequests] = useState(mockRequest)
   const {
      searchTerm,
      setSearchTerm,
      sortBy,
      setSortBy,
      sortOrder,
      toggleSortOrder,
      filteredData: filteredAndSortedRequests,
   } = useSearchAndSort<ServiceRequest>({
      data: requests,
      searchableFields: ['name', 'email', 'status'],
      sortableFields: ['date', 'name', 'status'],
   })

   return (
      <>
         <AdminTitle
            title="Gestión de Testimonios"
            description="Crea y administra los testimonios de la web"
         />

         <div className="flex flex-col lg:flex-row gap-4">
            <div className="max-w-2xl w-full">
               <span className="text-sm text-gray-600">Buscador:</span>

               <Input
                  className="w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Filtrar por nombre, rol o estado..."
               />
            </div>

            <div className="flex items-end justify-between lg:justify-normal ">
               <div className="flex items-end gap-2">
                  <div className="flex flex-col">
                     <span className="text-sm text-gray-600 whitespace-nowrap">
                        Ordenar por:
                     </span>

                     <Select
                        value={sortBy}
                        onValueChange={(value: keyof ServiceRequest) => setSortBy(value)}
                     >
                        <SelectTrigger className="sm:w-30">
                           <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                           <SelectItem value="date">Fecha</SelectItem>
                           <SelectItem value="name">Nombre</SelectItem>
                           <SelectItem value="stauts">Estado</SelectItem>
                        </SelectContent>
                     </Select>
                  </div>

                  <Button
                     variant="outline"
                     onClick={() => toggleSortOrder()}
                     className="flex items-center gap-1 bg-white!"
                  >
                     <ArrowUpDown className="w-4 h-4" />
                     {sortOrder === 'asc' ? (
                        <ChevronUp className="w-3 h-3" />
                     ) : (
                        <ChevronDown className="w-4 h-4" />
                     )}
                  </Button>
               </div>
            </div>
         </div>

         <RequestsTable requests={filteredAndSortedRequests} />
      </>
   )
}
export default RequestsPanel

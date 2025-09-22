import { ArrowUpDown, ChevronDown, ChevronUp, Plus } from 'lucide-react'
import TestimonialCard from './components/TestimonialCard'
import { Testimonial } from '@models/Testimonial.model'
import useSearchAndSort from '@hooks/useSearchAndSort'
import { routesConfig } from '@config/routesConfig'
import { ActionButton, PageTitle } from '@shared'
import { useNavigate } from 'react-router-dom'
import {
   Button,
   Input,
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@shadcn'

const mockTestimonials: Testimonial[] = [
   {
      id: '1',
      personName: 'María González',
      personRole: 'Directora Ejecutiva',
      description:
         'SILK transformó completamente mi imagen profesional. El servicio es excepcional y los resultados superaron mis expectativas. Ahora me siento más segura y auténtica en cada presentación.',
      image: '/placeholder.svg?height=100&width=100',
      isHighlight: true,
      isActive: true,
   },
   {
      id: '2',
      personName: 'Carlos Rodríguez',
      personRole: 'Empresario',
      description:
         'El análisis de color fue revelador. Ahora tengo mucha más confianza en mi forma de vestir y recibo muchos más cumplidos de colegas y clientes.',
      image: '/placeholder.svg?height=100&width=100',
      isHighlight: false,
      isActive: true,
   },
   {
      id: '3',
      personName: 'Ana Martínez',
      personRole: 'Consultora de Imagen',
      description:
         'La atención personalizada y el profesionalismo del equipo de SILK es incomparable. Recomiendo sus servicios al 100%. Una inversión que vale la pena.',
      image: '/placeholder.svg?height=100&width=100',
      isHighlight: true,
      isActive: true,
   },
   {
      id: '4',
      personName: 'Luis Fernández',
      personRole: 'Consultor de Negocios',
      description:
         'Excelente servicio de consultoría. Me ayudaron a definir mi estilo profesional de manera muy efectiva.',
      image: '/placeholder.svg?height=100&width=100',
      isHighlight: false,
      isActive: true,
   },
   {
      id: '5',
      personName: 'Patricia Silva',
      personRole: 'Arquitecta',
      description:
         'El proceso fue increíble, desde la primera consulta hasta el resultado final. Mi confianza aumentó notablemente.',
      image: '/placeholder.svg?height=100&width=100',
      isHighlight: false,
      isActive: true,
   },
   {
      id: '6',
      personName: 'Roberto Méndez',
      personRole: 'Médico Especialista',
      description:
         'Profesionalismo excepcional. El equipo entendió perfectamente mis necesidades y superó mis expectativas.',
      image: '/placeholder.svg?height=100&width=100',
      isHighlight: true,
      isActive: true,
   },
]

const TestimonialsPanel = () => {
   const navigate = useNavigate()

   const {
      searchTerm,
      setSearchTerm,
      sortBy,
      setSortBy,
      sortOrder,
      toggleSortOrder,
      filterValue,
      setFilterValue,
      filteredData: filteredAndSortedTestimonials,
   } = useSearchAndSort<Testimonial>({
      data: mockTestimonials,
      searchableFields: ['personName', 'personRole', 'description'],
      sortableFields: ['personName', 'personRole'],
      filterField: 'isHighlight',
   })

   return (
      <>
         <div className="flex justify-between items-center">
            <PageTitle
               title="Gestión de Testimonios"
               description="Crea y administra los testimonios de la web"
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

         <div className="flex flex-col lg:flex-row gap-x-4 gap-y-2">
            <div className="max-w-2xl w-full">
               <span className="text-sm text-gray-600">Buscador:</span>

               <Input
                  className="w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Filtrar por nombre, rol o contenido..."
               />
            </div>

            <div className="flex items-end justify-between lg:justify-normal ">
               <div className="flex items-end gap-4">
                  <div className="flex flex-col">
                     <span className="text-sm text-gray-600 whitespace-nowrap">
                        Ordenar por:
                     </span>

                     <Select
                        value={sortBy}
                        onValueChange={(value: keyof Testimonial) => setSortBy(value)}
                     >
                        <SelectTrigger className="sm:w-30">
                           <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                           <SelectItem value="personName">Nombre</SelectItem>
                           <SelectItem value="personRole">Rol</SelectItem>
                        </SelectContent>
                     </Select>
                  </div>

                  <div className="flex flex-col">
                     <span className="text-sm text-gray-600 whitespace-nowrap">
                        Estado:
                     </span>

                     <Select
                        value={filterValue}
                        onValueChange={(value) => setFilterValue(value)}
                     >
                        <SelectTrigger className="sm:w-30">
                           <SelectValue placeholder="Todos" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="all">Todos</SelectItem>
                           <SelectItem value="true">Destacado</SelectItem>
                           <SelectItem value="false">No Destacado</SelectItem>
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

         <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
            {filteredAndSortedTestimonials.map((testimonial, index) => (
               <TestimonialCard
                  key={`testimonial-card-${index}`}
                  testimonial={testimonial}
                  onEdit={(testimonial) =>
                     navigate(
                        routesConfig.ADMIN_TESTIMONIAL_EDIT.replace(
                           ':testimonialId',
                           testimonial.id
                        )
                     )
                  }
                  onDelete={(testimonial) =>
                     console.log('Delete testimonial:', testimonial)
                  }
               />
            ))}
         </div>
      </>
   )
}
export default TestimonialsPanel

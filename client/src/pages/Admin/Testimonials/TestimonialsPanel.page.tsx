import TestimonialCard from './components/TestimonialCard'
import { Testimonial } from '@models/Testimonial.model'
import { useNavigate } from 'react-router-dom'
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
import { ArrowUpDown, ChevronDown, ChevronUp, Plus } from 'lucide-react'
import { useState } from 'react'

const mockTestimonials: Testimonial[] = [
   {
      id: '1',
      personName: 'María González',
      personRole: 'Directora Ejecutiva',
      content:
         'SILK transformó completamente mi imagen profesional. El servicio es excepcional y los resultados superaron mis expectativas. Ahora me siento más segura y auténtica en cada presentación.',
      image: '/placeholder.svg?height=100&width=100',
      isHighlight: true,
   },
   {
      id: '2',
      personName: 'Carlos Rodríguez',
      personRole: 'Empresario',
      content:
         'El análisis de color fue revelador. Ahora tengo mucha más confianza en mi forma de vestir y recibo muchos más cumplidos de colegas y clientes.',
      image: '/placeholder.svg?height=100&width=100',
      isHighlight: false,
   },
   {
      id: '3',
      personName: 'Ana Martínez',
      personRole: 'Consultora de Imagen',
      content:
         'La atención personalizada y el profesionalismo del equipo de SILK es incomparable. Recomiendo sus servicios al 100%. Una inversión que vale la pena.',
      image: '/placeholder.svg?height=100&width=100',
      isHighlight: true,
   },
   {
      id: '4',
      personName: 'Luis Fernández',
      personRole: 'Consultor de Negocios',
      content:
         'Excelente servicio de consultoría. Me ayudaron a definir mi estilo profesional de manera muy efectiva.',
      image: '/placeholder.svg?height=100&width=100',
      isHighlight: false,
   },
   {
      id: '5',
      personName: 'Patricia Silva',
      personRole: 'Arquitecta',
      content:
         'El proceso fue increíble, desde la primera consulta hasta el resultado final. Mi confianza aumentó notablemente.',
      image: '/placeholder.svg?height=100&width=100',
      isHighlight: false,
   },
   {
      id: '6',
      personName: 'Roberto Méndez',
      personRole: 'Médico Especialista',
      content:
         'Profesionalismo excepcional. El equipo entendió perfectamente mis necesidades y superó mis expectativas.',
      image: '/placeholder.svg?height=100&width=100',
      isHighlight: true,
   },
]

type SortFieldsType = 'personName' | 'personRole'

const TestimonialsPanel = () => {
   const [searchTerm, setSearchTerm] = useState('')
   const [sortBy, setSortBy] = useState<SortFieldsType>('personName')
   const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

   const navigate = useNavigate()

   const filteredAndSortedTestimonials = mockTestimonials
      .filter(
         (post) =>
            post.personName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.personRole.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.content.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
         let comparison = 0

         switch (sortBy) {
            case 'personName':
               comparison = a.personName.localeCompare(b.personName)
               break
            case 'personRole':
               comparison = a.personRole.localeCompare(b.personRole)
               break
         }

         return sortOrder === 'asc' ? comparison : -comparison
      })

   return (
      <>
         <div className="flex justify-between items-center">
            <AdminTitle
               title="Gestión de Testimonios"
               description="Crea y administra los testimonios de la web"
            />

            <Button
               onClick={() => navigate('form')}
               size="lg"
               className="bg-emerald-800 hover:bg-emerald-900 text-white hidden sm:flex"
            >
               <Plus className="w-4 h-4 mr-2" />
               Nuevo
            </Button>
         </div>

         <div className="flex flex-col lg:flex-row gap-4">
            <div className="max-w-2xl w-full">
               <span className="text-sm text-gray-600">Buscador:</span>
               <Input
                  className="w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Filtrar por nombre, rol o contenido..."
               />
            </div>

            <div className="flex items-end justify-between md:justify-normal ">
               <div className="flex items-end gap-2">
                  <div className="flex flex-col">
                     <span className="text-sm text-gray-600 whitespace-nowrap">
                        Ordenar por:
                     </span>

                     <Select
                        value={sortBy}
                        onValueChange={(value: SortFieldsType) => setSortBy(value)}
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

                  <Button
                     variant="outline"
                     onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
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
               <Button
                  onClick={() => navigate('form')}
                  size="lg"
                  className="bg-emerald-800 hover:bg-emerald-900 text-white sm:hidden"
               >
                  <Plus className="w-4 h-4 mr-2" />
                  Nuevo
               </Button>
            </div>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
            {filteredAndSortedTestimonials.map((testimonial, index) => (
               <TestimonialCard
                  key={`testimonial-card-${index}`}
                  testimonial={testimonial}
               />
            ))}
         </div>
      </>
   )
}
export default TestimonialsPanel

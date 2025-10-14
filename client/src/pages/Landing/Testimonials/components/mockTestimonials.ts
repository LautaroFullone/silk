import { Testimonial } from '@models/Testimonial.model'

export const mockTestimonials: Testimonial[] = [
   {
      id: '1',
      personName: 'María González',
      personRole: 'Ejecutiva de Marketing',
      description:
         'Silk transformó completamente mi forma de vestirme. Ahora me siento más segura y profesional en mi trabajo. El asesoramiento fue personalizado y superó todas mis expectativas.',
      isHighlight: true,
      isActive: true,
      avatarImagePath: '/recomendacion-lauti.png',
   },
   {
      id: '2',
      personName: 'Ana Rodríguez',
      personRole: 'Emprendedora',
      description:
         'El personal shopping me ahorró tanto tiempo y me ayudó a encontrar piezas que realmente amo. Cada outfit que arman funciona perfectamente para mi lifestyle.',
      isHighlight: false,
      isActive: true,
   },
   {
      id: '3',
      personName: 'Lucía Fernández',
      personRole: 'Arquitecta',
      description:
         'Increíble cómo lograron capturar mi personalidad en cada look. El proceso fue súper divertido y el resultado final me encanta.',
      isHighlight: true,
      isActive: true,
   },
   {
      id: '4',
      personName: 'Sofía Martinez',
      personRole: 'Doctora',
      description:
         'Siempre pensé que no tenía estilo, pero Silk me demostró lo contrario. Ahora entiendo qué colores me favorecen y cómo combinar las prendas.',
      isHighlight: false,
      isActive: true,
   },
   {
      id: '5',
      personName: 'Carmen López',
      personRole: 'Consultora',
      description:
         'El servicio de transformación de imagen cambió mi vida. No solo mi guardarropa, sino mi confianza en mí misma. ¡Totalmente recomendado!',
      isHighlight: false,
      isActive: true,
   },
   {
      id: '6',
      personName: 'Valentina Torres',
      personRole: 'Diseñadora Gráfica',
      description:
         'Profesionalismo y creatividad en cada detalle. Me ayudaron a encontrar un estilo que refleja quien soy realmente.',
      isHighlight: true,
      isActive: true,
   },
]

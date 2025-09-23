import { useNavigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { Button } from '@shadcn'

const FindStyleSection = () => {
   const navigate = useNavigate()

   return (
      <div className="min-h-[60vh] bg-[url('/Quiz_assets-07.png')] bg-cover bg-center flex items-center justify-center py-20 text-silk-secondary">
         <div className="overflow-hidden bg-silk-secondary border border-silk-secondary rounded-sm w-full max-w-xl mx-4 flex flex-col items-center ">
            <div className="w-full flex items-center px-2 py-2 ">
               <div className="flex space-x-1.5 mr-3">
                  <span className="block w-2 h-2 bg-gray-400 rounded-full" />
                  <span className="block w-2 h-2 bg-gray-400 rounded-full" />
                  <span className="block w-2 h-2 bg-gray-400 rounded-full" />
               </div>
            </div>
            <div className="bg-silk-tertiary ">
               <div className="flex justify-between w-full text-xs font-semibold p-2 font-classy-vogue">
                  <span>ESTUDIOSILK</span>
                  <span>EVERYDAY LUXURY</span>
               </div>

               <div className="flex flex-col items-center justify-center px-10 sm:px-20 py-8 pb-13 w-full">
                  <h1 className="font-bold text-3xl sm:text-4xl text-center mb-4">
                     ¿Todavía no <br /> encontraste tu estilo?
                  </h1>
                  <p className="text-center text-xl mb-8">
                     Descubrí tu estilo ideal con nuestro <b>quiz</b> personalizado. Es
                     rápido, práctico y el primer paso para transformar tu guardarropa.
                  </p>
                  <Button onClick={() => navigate('quiz')} variant="default" size="xl">
                     HACER EL QUIZ <ChevronRight className="ml-1" size={19} />
                  </Button>
               </div>
            </div>
         </div>
      </div>
   )
}

export default FindStyleSection

const FindStyleSection = () => {
   return (
      <div
         className="min-h-[400px] md:min-h-[600px] bg-[url('/Quiz_assets-07.png')] 
            bg-cover bg-center flex items-center justify-center"
      >
         <div className="relative w-full max-w-[600px] flex justify-center items-center">
            <div className="w-full px-2 sm:px-0">
               <img
                  src="/ventana-con-estilo.jpg"
                  alt="Quiz"
                  className="w-full h-auto max-h-[300px] sm:max-h-none object-contain"
               />
            </div>

            <button
               className="absolute left-1/2 -translate-x-1/2 bottom-6 sm:bottom-10 
                  bg-primary px-5 py-2 sm:px-6 sm:py-3 rounded-md shadow-lg hover:scale-105          
                  flex items-center cursor-pointer transition-all"
            >
               HACER EL QUIZ
               <span className="ml-2">{'>'}</span>
            </button>
         </div>
      </div>
   )
}

export default FindStyleSection

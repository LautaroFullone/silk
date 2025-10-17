import { ReactNode } from 'react'

interface PageTitleLandingProps {
   title: string | ReactNode
   description?: string | ReactNode
}
const PageTitleLanding: React.FC<PageTitleLandingProps> = ({ title, description }) => {
   return (
      <section className="text-center">
         <h1 className="font-very-vogue text-5xl md:text-6xl text-silk-secondary mb-4 leading-tight">
            {title}
         </h1>

         {description && (
            <p className="max-w-3xl text-lg md:text-xl text-silk-secondary/80 leading-relaxed mx-auto">
               {description}
            </p>
         )}
      </section>
   )
}
export default PageTitleLanding

import { ReactNode } from 'react'

interface PageTitleLandingProps {
   title: string | ReactNode
   description?: string | ReactNode
   textColor?: 'text-silk-primary' | 'text-silk-secondary' | 'text-silk-tertiary'
   element?: 'h1' | 'h2'
}

const PageTitleLanding: React.FC<PageTitleLandingProps> = ({
   title,
   description,
   textColor = 'text-silk-secondary',
   element = 'h1',
}) => {
   return (
      <section className="text-center">
         {element === 'h1' ? (
            <h1
               className={`font-very-vogue text-5xl md:text-6xl mb-4 leading-tight ${textColor}`}
            >
               {title}
            </h1>
         ) : (
            <h2
               className={`font-very-vogue text-5xl md:text-6xl mb-4 leading-tight ${textColor}`}
            >
               {title}
            </h2>
         )}

         {description && (
            <p
               className={`max-w-3xl text-lg md:text-xl ${textColor}/80 leading-relaxed mx-auto`}
            >
               {description}
            </p>
         )}
      </section>
   )
}
export default PageTitleLanding

import { FC, JSX, ReactNode } from 'react'

interface SectionContainerProps {
   children: ReactNode
   as?: 'section' | 'footer' | 'header' | 'main' | 'div'
   backgroundColor?:
      | 'bg-silk-primary'
      | 'bg-silk-secondary'
      | 'bg-silk-tertiary'
      | `bg-[${string}]`
   className?: string
   childrenClassName?: string
}

const Container: FC<SectionContainerProps> = ({
   children,
   as: asTag = 'section',
   backgroundColor = '',
   className = '',
   childrenClassName = '',
}) => {
   const Tag = asTag as keyof JSX.IntrinsicElements

   return (
      <Tag className={`${backgroundColor} py-15 md:py-20 px-6 sm:px-0 ${className}`}>
         <div
            className={`max-w-sm sm:max-w-xl lg:max-w-5xl mx-auto  ${childrenClassName}`}
         >
            {children}
         </div>
      </Tag>
   )
}

export default Container

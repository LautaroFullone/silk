import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@shared/shadcn/utils.ts'

const buttonVariants = cva(
   "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
   {
      variants: {
         variant: {
            default: 'bg-primary text-tertiary shadow-xs hover:bg-primary/90',
            tertiary: 'bg-tertiary text-secondary shadow-xs hover:bg-tertiary/90',
            destructive:
               'bg-destructive! text-white shadow-xs hover:bg-destructive/80! focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
            outline:
               'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
            secondary: 'bg-secondary text-tertiary shadow-xs hover:bg-secondary/80',
            ghost: 'border-none hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
            link: 'text-primary underline-offset-4 hover:underline',
         },
         size: {
            default: 'h-9 px-4 py-2 has-[>svg]:px-3',
            sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
            lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
            xl: 'h-12 rounded-md px-8 has-[>svg]:px-6 text-lg',
            icon: 'size-9',
         },
      },
      defaultVariants: {
         variant: 'default',
         size: 'default',
      },
   }
)

function Button({
   className,
   variant,
   size,
   disableScale = false,
   asChild = false,
   ...props
}: React.ComponentProps<'button'> & { disableScale?: boolean } & VariantProps<
      typeof buttonVariants
   > & {
      asChild?: boolean
   }) {
   const Comp = asChild ? Slot : 'button'

   return (
      <Comp
         data-slot="button"
         className={cn(
            buttonVariants({ variant, size, className }),
            !disableScale &&
               'transition-transform duration-200 hover:scale-105 border border-gray-200',
            'cursor-pointer'
         )}
         {...props}
      />
   )
}

export { Button, buttonVariants }

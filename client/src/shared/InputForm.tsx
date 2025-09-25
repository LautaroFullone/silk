import { FieldErrors, UseFormRegisterReturn } from 'react-hook-form'
import { InputHTMLAttributes } from 'react'
import { OctagonAlert, Loader2 } from 'lucide-react'
import { Input, Label, Button } from '@shadcn'
import type { LucideIcon } from 'lucide-react'

interface InputFormProps extends InputHTMLAttributes<HTMLInputElement> {
   name: string
   label: string
   register?: UseFormRegisterReturn
   errors?: FieldErrors
   isCurrency?: boolean
   labelClassName?: string
   isLoading?: boolean

   icon?: LucideIcon
   iconSide?: 'left' | 'right'
   iconClassName?: string

   button?: {
      onClick: () => void
      label: string
   }
}

const InputForm: React.FC<InputFormProps> = ({
   name,
   label,
   register,
   errors = {},
   isCurrency = false,
   placeholder,
   className = '',
   labelClassName = '',
   value,
   icon,
   iconSide = 'left',
   iconClassName = '',
   isLoading,
   button,
   ...props
}) => {
   // eslint-disable-next-line
   const fieldError = name.split('.').reduce((acc, key) => acc?.[key], errors as any)
   const hasError = !!fieldError

   const currencyAvailable = isCurrency && value !== undefined && value !== ''
   const hasButton = !!button

   const Icon = icon
   const hasLeftIcon = !!Icon && iconSide === 'left'
   const hasRightIcon = !!Icon && iconSide === 'right'

   // Padding dinámico
   // $ ocupa ~pl-6; si además hay icono a la izquierda, usamos pl-10
   const leftPad = currencyAvailable
      ? hasLeftIcon
         ? 'pl-10'
         : 'pl-6'
      : hasLeftIcon
      ? 'pl-9'
      : ''

   // Ajustar padding derecho si hay botón o icono
   const rightPad = hasButton
      ? '' // Sin padding cuando hay botón
      : hasRightIcon
      ? 'pr-9'
      : ''

   const IconNode = Icon ? (
      <span
         className={`absolute top-1/2 -translate-y-1/2 z-10 ${
            iconSide === 'left' ? 'left-3' : 'right-3'
         }`}
      >
         <Icon className={`h-4 w-4 text-muted-foreground ${iconClassName}`} />
      </span>
   ) : null

   return (
      <div className="space-y-1">
         <Label htmlFor={`input-${name}`} className={labelClassName}>
            {label}
         </Label>

         <div className={`relative ${hasButton ? 'flex' : ''}`}>
            {currencyAvailable && (
               <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground z-10">
                  $
               </span>
            )}

            {hasLeftIcon && IconNode}

            <Input
               value={value}
               id={`input-${name}`}
               placeholder={placeholder}
               className={`mb-0 ${leftPad} ${rightPad} ${
                  hasError
                     ? 'border-red-500 focus:border-0 focus-visible:ring-red-500'
                     : ''
               } ${hasButton ? 'rounded-r-none border-r-0 flex-1' : ''} ${className}`}
               {...register}
               {...props}
            />

            {hasButton && (
               <Button
                  type="button"
                  onClick={button.onClick}
                  disabled={isLoading}
                  className="rounded-l-none border-l-0 px-4 py-2 h-10"
               >
                  {isLoading ? (
                     <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                     button.label
                  )}
               </Button>
            )}
         </div>

         {hasError && (
            <p className="mt-1 text-xs text-red-500 flex items-top gap-1">
               <OctagonAlert size={13} />
               {fieldError.message}
            </p>
         )}
      </div>
   )
}

export default InputForm

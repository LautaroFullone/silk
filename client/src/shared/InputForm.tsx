import { FieldErrors, UseFormRegisterReturn } from 'react-hook-form'
import { InputHTMLAttributes } from 'react'
import { OctagonAlert } from 'lucide-react'
import { Input, Label } from '@shadcn'
import type { LucideIcon } from 'lucide-react'

interface InputFormProps extends InputHTMLAttributes<HTMLInputElement> {
   name: string
   label: string
   register?: UseFormRegisterReturn
   errors?: FieldErrors
   isCurrency?: boolean
   labelClassName?: string
   /** NUEVO: icono opcional */
   icon?: LucideIcon
   /** NUEVO: lado del icono */
   iconSide?: 'left' | 'right'
   /** NUEVO: clase del icono */
   iconClassName?: string
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
   ...props
}) => {
   // eslint-disable-next-line
   const fieldError = name.split('.').reduce((acc, key) => acc?.[key], errors as any)
   const hasError = !!fieldError

   const currencyAvailable = isCurrency && value !== undefined && value !== ''

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
   const rightPad = hasRightIcon ? 'pr-9' : ''

   const IconNode = Icon ? (
      <span
         className={`absolute top-1/2 -translate-y-1/2 ${
            iconSide === 'left' ? 'left-3' : 'right-3'
         }`}
      >
         <Icon className={`h-4 w-4 text-muted-foreground ${iconClassName}`} />
      </span>
   ) : null

   return (
      <div className="space-y-2">
         <Label htmlFor={`input-${name}`} className={labelClassName}>
            {label}
         </Label>

         <div className="relative">
            {currencyAvailable && (
               <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
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
               } ${className}`}
               {...register}
               {...props}
            />

            {hasRightIcon && IconNode}
         </div>

         {hasError && (
            <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
               <OctagonAlert size={13} />
               {fieldError.message}
            </p>
         )}
      </div>
   )
}

export default InputForm

// import { FieldErrors, UseFormRegisterReturn } from 'react-hook-form'
// import { InputHTMLAttributes } from 'react'
// import { OctagonAlert } from 'lucide-react'
// import { Input, Label } from '@shadcn'

// interface InputFormProps extends InputHTMLAttributes<HTMLInputElement> {
//    name: string
//    label: string
//    register?: UseFormRegisterReturn
//    errors?: FieldErrors
//    isCurrency?: boolean
//    labelClassName?: string
// }

// const InputForm: React.FC<InputFormProps> = ({
//    name,
//    label,
//    register,
//    errors = {},
//    isCurrency = false,
//    placeholder,
//    className = '',
//    labelClassName = '',
//    value,
//    ...props
// }) => {
//    // eslint-disable-next-line
//    const fieldError = name.split('.').reduce((acc, key) => acc?.[key], errors as any)
//    const hasError = !!fieldError

//    const currencyAvaliable = isCurrency && value

//    return (
//       <div className="space-y-2">
//          <Label htmlFor={`input-${name}`} className={labelClassName}>
//             {label}
//          </Label>
//          <div className="relative">
//             {currencyAvaliable && (
//                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
//                   $
//                </span>
//             )}
//             <Input
//                value={value}
//                id={`input-${name}`}
//                placeholder={placeholder}
//                className={`mb-0 ${currencyAvaliable ? 'pl-6' : ''} ${
//                   hasError
//                      ? 'border-red-500 focus:border-0 focus-visible:ring-red-500'
//                      : ''
//                } ${className}`}
//                {...register}
//                {...props}
//             />
//          </div>

//          {hasError && (
//             <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
//                <OctagonAlert size={13} />
//                {fieldError.message}
//             </p>
//          )}
//       </div>
//    )
// }

// export default InputForm

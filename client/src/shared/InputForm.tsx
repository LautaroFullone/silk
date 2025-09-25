import { FieldErrors, UseFormRegisterReturn } from 'react-hook-form'
import { Input, Label, cn, Skeleton } from '@shadcn'
import type { LucideIcon } from 'lucide-react'
import { InputHTMLAttributes } from 'react'
import { OctagonAlert } from 'lucide-react'

interface InputFormProps extends InputHTMLAttributes<HTMLInputElement> {
   name: string
   label: string
   labelClassName?: string
   icon?: LucideIcon
   iconSide?: 'left' | 'right'
   isLoading?: boolean

   register?: UseFormRegisterReturn
   errors?: FieldErrors
}

const InputForm: React.FC<InputFormProps> = ({
   id,
   name,
   label,
   labelClassName = '',
   placeholder,
   value,
   icon: Icon,
   iconSide = 'left',
   isLoading = false,
   register,
   errors = {},
   className = '',
   disabled,
   ...props
}) => {
   // eslint-disable-next-line
   const fieldError = name.split('.').reduce((acc, key) => acc?.[key], errors as any)
   const hasError = !!fieldError

   return (
      <div className="space-y-1">
         {label && (
            <Label htmlFor={id} className={labelClassName}>
               {label}
            </Label>
         )}

         <div className={'relative'}>
            {isLoading ? (
               <Skeleton className="w-full h-9" />
            ) : (
               <>
                  {Icon && (
                     <span
                        className={cn(
                           'absolute top-1/2 transform -translate-y-1/2 text-gray-500',
                           iconSide === 'left' ? 'left-3' : 'right-3'
                        )}
                     >
                        <Icon className="size-4" />
                     </span>
                  )}

                  <Input
                     value={value}
                     id={`input-${name}`}
                     placeholder={placeholder}
                     disabled={disabled || isLoading}
                     className={cn(
                        Icon && iconSide === 'left'
                           ? 'pl-8'
                           : iconSide === 'right'
                           ? 'pr-8'
                           : '',
                        hasError &&
                           'border-red-500 focus:border-0 focus-visible:ring-red-500',
                        className
                     )}
                     {...register}
                     {...props}
                  />
               </>
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

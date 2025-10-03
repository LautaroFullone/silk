import { FieldErrors, UseFormRegisterReturn } from 'react-hook-form'
import { TextareaHTMLAttributes } from 'react'
import { OctagonAlert } from 'lucide-react'
import { Textarea, Label, cn, Skeleton } from '@shadcn'

interface TextAreaFormProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
   name: string
   label?: string
   labelClassName?: string
   isLoading?: boolean
   limit?: number

   register?: UseFormRegisterReturn
   errors?: FieldErrors
}

const TextAreaForm: React.FC<TextAreaFormProps> = ({
   id,
   name,
   label,
   labelClassName = '',
   value,
   placeholder,
   className = '',
   disabled,
   isLoading = false,
   register,
   limit,
   errors = {},
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

         {isLoading ? (
            <Skeleton className="w-full h-16" />
         ) : (
            <>
               <Textarea
                  value={value}
                  maxLength={limit}
                  id={`textarea-${name}`}
                  placeholder={placeholder}
                  disabled={disabled || isLoading}
                  className={cn(
                     hasError &&
                        'border-red-500 focus:border-0 focus-visible:ring-red-500',
                     className
                  )}
                  {...register}
                  {...props}
               />

               {limit && (
                  <div className="mt-1 text-xs text-zinc-500 text-right">
                     {(value as string).length}/{limit}
                  </div>
               )}

               {hasError && (
                  <p className="mt-1 text-xs text-red-500 flex items-top gap-1">
                     <OctagonAlert size={13} />
                     {fieldError.message}
                  </p>
               )}
            </>
         )}
      </div>
   )
}

export default TextAreaForm

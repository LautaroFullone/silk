import { FieldErrors } from 'react-hook-form'
import { OctagonAlert } from 'lucide-react'
import { HTMLAttributes } from 'react'
import { Label } from '@shadcn/label'
import { Checkbox, Skeleton } from '@shadcn'

interface CheckboxFormProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
   name: string
   label: string
   value: boolean
   description?: string
   isLoading?: boolean
   disabled?: boolean

   onChange: (value: boolean) => void
   errors?: FieldErrors
}

const CheckboxForm: React.FC<CheckboxFormProps> = ({
   name,
   label,
   value,
   onChange,
   description,
   isLoading = false,
   disabled = false,
   errors = {},
   className = '',
}) => {
   // eslint-disable-next-line
   const fieldError = name.split('.').reduce((acc, key) => acc?.[key], errors as any)
   const hasError = !!fieldError

   return (
      <div className={`flex items-start gap-2 ${className}`}>
         {isLoading ? (
            <Skeleton className="shrink-0 h-4 w-4 rounded-sm" />
         ) : (
            <Checkbox
               id={`checkbox-${name}`}
               checked={value}
               onCheckedChange={onChange}
               disabled={disabled}
            />
         )}

         <div className="flex flex-col space-y-1 w-full">
            {isLoading ? (
               <Skeleton className="h-4 w-36" />
            ) : (
               <Label htmlFor={`checkbox-${name}`}>{label}</Label>
            )}

            {description && (
               <>
                  {isLoading ? (
                     <Skeleton className="h-4 w-full" />
                  ) : (
                     <p className="text-gray-500 text-sm leading-4">{description}</p>
                  )}
               </>
            )}

            {hasError && (
               <p className="mt-1 text-xs text-red-500 flex items-top gap-1">
                  <OctagonAlert size={13} />
                  {fieldError.message}
               </p>
            )}
         </div>
      </div>
   )
}

export default CheckboxForm

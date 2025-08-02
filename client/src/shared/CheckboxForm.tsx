import { Label } from '@shadcn/label'
import { Checkbox } from '@shadcn'
import { OctagonAlert } from 'lucide-react'
import { FieldErrors } from 'react-hook-form'
import { HTMLAttributes } from 'react'

interface CheckboxFormProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
   name: string
   label: string
   value: boolean
   onChange: (value: boolean) => void
   description?: string
   errors?: FieldErrors
}

const CheckboxForm: React.FC<CheckboxFormProps> = ({
   name,
   label,
   value,
   onChange,
   description,
   errors = {},
   className = '',
}) => {
   // eslint-disable-next-line
   const fieldError = name.split('.').reduce((acc, key) => acc?.[key], errors as any)
   const hasError = !!fieldError

   return (
      <div className={`flex items-start gap-2 ${className}`}>
         <Checkbox id={`checkbox-${name}`} checked={value} onCheckedChange={onChange} />
         <div className="flex flex-col space-y-2">
            <Label htmlFor={`checkbox-${name}`}>{label}</Label>
            {description && (
               <p className="text-gray-500 text-sm leading-4">{description}</p>
            )}
            {hasError && (
               <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                  <OctagonAlert size={13} />
                  {fieldError.message}
               </p>
            )}
         </div>
      </div>
   )
}

export default CheckboxForm

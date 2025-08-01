import { FieldErrors, UseFormRegisterReturn } from 'react-hook-form'
import { TextareaHTMLAttributes } from 'react'
import { OctagonAlert } from 'lucide-react'
import { Textarea, Label } from '@shadcn'

interface TextAreaFormProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
   name: string
   label: string
   register?: UseFormRegisterReturn
   errors?: FieldErrors
}

const TextAreaForm: React.FC<TextAreaFormProps> = ({
   name,
   label,
   register,
   errors = {},
   placeholder,
   className = '',
   value,
   ...props
}) => {
   // eslint-disable-next-line
   const fieldError = name.split('.').reduce((acc, key) => acc?.[key], errors as any)
   const hasError = !!fieldError

   return (
      <div className="space-y-2">
         <Label htmlFor={`textarea-${name}`}>{label}</Label>
         <Textarea
            id={`textarea-${name}`}
            placeholder={placeholder}
            className={`${
               hasError ? 'border-red-500 focus:border-0 focus-visible:ring-red-500' : ''
            } ${className}`}
            value={value}
            {...register}
            {...props}
         />
         {hasError && (
            <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
               <OctagonAlert size={13} />
               {fieldError.message}
            </p>
         )}
      </div>
   )
}

export default TextAreaForm

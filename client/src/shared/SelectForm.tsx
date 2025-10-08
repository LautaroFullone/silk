import { FieldErrors, UseFormRegisterReturn } from 'react-hook-form'
import { OctagonAlert } from 'lucide-react'
import {
   Label,
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@shadcn'

interface SelectOption {
   label: string
   value: string
}

interface SelectFormProps {
   name: string
   label: string
   value?: string
   onChange?: (value: string) => void
   options: SelectOption[]
   placeholder?: string
   errors?: FieldErrors
   className?: string
   labelClassName?: string
   register?: UseFormRegisterReturn
}

const SelectForm: React.FC<SelectFormProps> = ({
   name,
   label,
   value,
   onChange,
   options,
   placeholder = 'Selecciona una opción',
   errors = {},
   className = '',
   labelClassName = '',
   register,
}) => {
   // eslint-disable-next-line
   const fieldError = name.split('.').reduce((acc, key) => acc?.[key], errors as any)
   const hasError = !!fieldError

   // Si se proporciona register, usar los valores del register
   // Si no, usar value y onChange directamente
   const selectValue = register ? undefined : value

   const handleValueChange = (newValue: string) => {
      if (register) {
         // Para react-hook-form, necesitamos crear un evento sintético
         register.onChange({
            target: {
               name: register.name,
               value: newValue,
            },
            type: 'change',
         })
      } else if (onChange) {
         onChange(newValue)
      }
   }

   return (
      <div>
         <Label htmlFor={name} className={`mb-2 ${labelClassName}`}>
            {label}
         </Label>

         <Select
            value={selectValue}
            onValueChange={handleValueChange}
            name={register?.name || name}
         >
            <SelectTrigger
               id={`select-${name}`}
               className={`w-full shadow-xs ${
                  hasError ? 'border-red-500 focus:ring-red-500' : ''
               } ${className}`}
            >
               <SelectValue placeholder={placeholder} />
            </SelectTrigger>

            <SelectContent>
               {options.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                     {opt.label}
                  </SelectItem>
               ))}
            </SelectContent>
         </Select>

         {hasError && (
            <p className="mt-1 text-xs text-red-500 flex items-top gap-1">
               <OctagonAlert size={13} />
               {fieldError.message}
            </p>
         )}
      </div>
   )
}

export default SelectForm

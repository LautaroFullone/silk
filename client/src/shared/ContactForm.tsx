import useCreateRequest from '@hooks/react-query/Requests/useCreateRequest'
import { Calendar, Mail, MapPin, Phone, User } from 'lucide-react'
import { ServiceRequestFormData } from '@models/Request.model'
import { Button, Card, CardContent } from '@shadcn'
import { useForm } from 'react-hook-form'
import SelectForm from './SelectForm'
import InputForm from './InputForm'

const initialFormData: ServiceRequestFormData = {
   name: '',
   phone: '',
   services: ['Colorimetria'],
   budget: '',
   age: 0,
   email: '',
   ubication: '',
   startMoment: '',
}

interface ContactFormProps {
   isServiceInputEnabled?: boolean
}

const ContactForm: React.FC<ContactFormProps> = ({ isServiceInputEnabled = false }) => {
   const { createServiceRequestMutate, isPending } = useCreateRequest()

   const {
      register,
      setValue,
      reset,
      watch,
      handleSubmit,
      formState: { errors },
   } = useForm<ServiceRequestFormData>({
      mode: 'onChange',
      reValidateMode: 'onChange',
      defaultValues: initialFormData,
   })

   const handleCreateServiceRequest = async (formData: ServiceRequestFormData) => {
      const processedData = {
         ...formData,
         age: parseInt(formData.age.toString(), 10),
      }
      await createServiceRequestMutate(processedData)
      reset()
   }

   const isButtonEnabled = !Object.keys(errors).length

   return (
      <Card className="shadow-sm rounded-xl">
         <CardContent className="h-full">
            <>
               <div className="text-center">
                  <h3 className="text-2xl md:text-3xl font-semibold text-silk-primary">
                     Tomá el primer paso
                  </h3>
               </div>

               <p className="text-center text-xs tracking-wide text-silk-primary/80 uppercase">
                  Completa tus datos para recibir tu diagnóstico
               </p>

               <div className="space-y-4 mt-6">
                  <div className="grid grid-cols-2 gap-4">
                     <InputForm
                        type="text"
                        name="name"
                        label="Nombre Completo"
                        labelClassName="text-silk-primary"
                        placeholder="Ingresá tu nombre"
                        register={register('name', {
                           required: 'El nombre es obligatorio',
                           maxLength: {
                              value: 50,
                              message: 'El nombre no puede superar los 50 caracteres',
                           },
                           pattern: {
                              value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                              message: 'El nombre solo puede contener letras y espacios',
                           },
                        })}
                        errors={errors}
                        icon={User}
                     />

                     <InputForm
                        type="number"
                        name="age"
                        label="Edad"
                        value={watch('age') || ''}
                        labelClassName="text-silk-primary"
                        placeholder="Ingresá tu edad"
                        register={register('age', {
                           required: 'La edad es obligatoria',
                           valueAsNumber: true,
                           min: {
                              value: 13,
                              message: 'La edad mínima es 13 años',
                           },
                           max: {
                              value: 120,
                              message: 'La edad máxima es 120 años',
                           },
                        })}
                        errors={errors}
                        icon={Calendar}
                     />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <InputForm
                        type="text"
                        name="ubication"
                        label="Ubicación"
                        labelClassName="text-silk-primary"
                        placeholder="Ingresá tu ubicación"
                        register={register('ubication', {
                           required: 'La ubicación es obligatoria',
                           maxLength: {
                              value: 100,
                              message: 'La ubicación no puede superar los 100 caracteres',
                           },
                        })}
                        errors={errors}
                        icon={MapPin}
                     />

                     <InputForm
                        type="tel"
                        name="phone"
                        label="Teléfono"
                        labelClassName="text-silk-primary"
                        placeholder="Ingresá tu teléfono"
                        register={register('phone', {
                           required: 'El teléfono es obligatorio',
                           pattern: {
                              value: /^[\d\s\-+()]+$/,
                              message:
                                 'El teléfono solo puede contener números, espacios, guiones, paréntesis y el signo +',
                           },
                           minLength: {
                              value: 8,
                              message: 'El teléfono debe tener al menos 8 caracteres',
                           },
                           maxLength: {
                              value: 20,
                              message: 'El teléfono no puede superar los 20 caracteres',
                           },
                        })}
                        errors={errors}
                        disabled={false}
                        icon={Phone}
                     />
                  </div>

                  <InputForm
                     type="email"
                     name="email"
                     label="Email"
                     labelClassName="text-silk-primary"
                     placeholder="Ingresá tu email"
                     register={register('email', {
                        required: 'El email es obligatorio',
                        pattern: {
                           value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                           message: 'El email no tiene un formato válido',
                        },
                        maxLength: {
                           value: 100,
                           message: 'El email no puede superar los 100 caracteres',
                        },
                     })}
                     errors={errors}
                     icon={Mail}
                  />

                  {isServiceInputEnabled && (
                     <SelectForm
                        value={watch('services')?.join(', ') || ''}
                        {...register('services', {
                           required: 'El servicio es obligatorio',
                        })}
                        onChange={(value) => {
                           setValue('services', value ? [value] : [], {
                              shouldValidate: true,
                              shouldDirty: true,
                           })
                        }}
                        label="¿Que tipo de servicio estas buscando?"
                        labelClassName="text-silk-primary"
                        placeholder="Seleccionar"
                        options={[
                           {
                              label: 'Personal Shopper & Closet Detox',
                              value: 'personal-shopper',
                           },
                           {
                              label: 'Transfomá tu imagen',
                              value: 'image-transformation',
                           },
                        ]}
                        errors={errors}
                     />
                  )}

                  <div className="grid grid-cols-2 gap-4 items-end">
                     <SelectForm
                        {...register('budget', {
                           required: 'El presupuesto es obligatorio',
                        })}
                        value={watch('budget') || ''}
                        onChange={(value) =>
                           setValue('budget', value, {
                              shouldValidate: true,
                              shouldDirty: true,
                           })
                        }
                        label="¿Cual es tu presupuesto para ropa y accesorios?"
                        labelClassName="text-silk-primary"
                        name="budget"
                        placeholder="Seleccionar"
                        errors={errors}
                        options={[
                           {
                              label: 'Hasta 100 USD',
                              value: 'from-0-to-100',
                           },
                           {
                              label: 'Entre 100 y 250 USD',
                              value: 'from-100-to-250',
                           },
                           {
                              label: 'Entre 250 y 500 USD',
                              value: 'from-250-to-500',
                           },
                           {
                              label: 'Entre 500 y 1000 USD',
                              value: 'from-500-to-1000',
                           },
                           {
                              label: 'Más de 1000 USD',
                              value: 'from-1000-to-x',
                           },
                        ]}
                     />

                     <SelectForm
                        {...register('startMoment', {
                           required: 'El momento de inicio es obligatorio',
                        })}
                        value={watch('startMoment')}
                        onChange={(value) =>
                           setValue('startMoment', value, {
                              shouldValidate: true,
                              shouldDirty: true,
                           })
                        }
                        label="¿Cuándo te gustaría empezar?"
                        labelClassName="text-silk-primary"
                        name="startMoment"
                        placeholder="Seleccionar"
                        errors={errors}
                        options={[
                           { label: 'Inmediatamente', value: 'now' },
                           {
                              label: 'El próximo mes',
                              value: 'next-month',
                           },
                           { label: 'A convenir', value: 'to-agree' },
                        ]}
                     />
                  </div>

                  <div className="flex justify-center">
                     <Button
                        onClick={handleSubmit(handleCreateServiceRequest)}
                        className="mt-2 px-15"
                        variant="default"
                        size="lg"
                        disabled={!isButtonEnabled || isPending}
                     >
                        {isPending ? 'Enviando...' : 'Enviar'}
                     </Button>
                  </div>
               </div>
            </>
         </CardContent>
      </Card>
   )
}
export default ContactForm

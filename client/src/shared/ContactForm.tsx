import { Calendar, Mail, MapPin, Phone, User } from 'lucide-react'
import { ServiceRequestFormData } from '@models/Request.model'
import { Card, CardContent } from '@shadcn'
import { useCreateRequest } from '@hooks'
import ActionButton from './ActionButton'
import { useForm } from 'react-hook-form'
import SelectForm from './SelectForm'
import InputForm from './InputForm'

const initialFormData: ServiceRequestFormData = {
   name: '',
   phone: '',
   service: undefined,
   budget: undefined,
   age: undefined,
   email: '',
   ubication: '',
   startMoment: undefined,
}

interface ContactFormProps {
   title?: string
   subTitle?: string
   isServiceInputEnabled?: boolean
   onSubmitSuccess?: () => void
}

const ContactForm: React.FC<ContactFormProps> = ({
   title = 'Tomá el primer paso',
   subTitle = 'Completá tus datos para recibir tu diagnóstico',
   isServiceInputEnabled = false,
   onSubmitSuccess,
}) => {
   const { createServiceRequestMutate, isPending } = useCreateRequest()

   const {
      register,
      reset,
      watch,
      handleSubmit,
      formState: { errors },
   } = useForm<ServiceRequestFormData>({
      mode: 'onSubmit',
      reValidateMode: 'onChange',
      defaultValues: initialFormData,
   })

   const handleCreateServiceRequest = async (formData: ServiceRequestFormData) => {
      const processedData = {
         ...formData,
         service: (isServiceInputEnabled ? formData.service : 'Colorimetría') || '',
         budget: formData.budget || '',
         age: formData.age || 0,
         startMoment: formData.startMoment || '',
      }
      await createServiceRequestMutate(processedData)
      reset()

      if (onSubmitSuccess) {
         onSubmitSuccess()
      }
   }

   return (
      <Card className="shadow-sm rounded-xl">
         <CardContent className="h-full">
            <>
               <div className="text-center">
                  <h3 className="text-2xl md:text-3xl font-semibold text-silk-primary">
                     {title}
                  </h3>
               </div>

               <p className="text-center text-xs tracking-wide text-silk-primary/80 uppercase">
                  {subTitle}
               </p>

               <div className="space-y-4 mt-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
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
                        name="service"
                        label="¿Que tipo de servicio estas buscando?"
                        labelClassName="text-silk-primary"
                        placeholder="Seleccioná un servicio"
                        value={watch('service')}
                        register={register('service', {
                           required: 'El servicio es obligatorio',
                        })}
                        options={[
                           'Personal Shopper & Closet Detox',
                           'Transfomá tu imagen',
                        ]}
                        errors={errors}
                     />
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
                     <SelectForm
                        name="budget"
                        label="¿Cual es tu presupuesto para ropa y accesorios?"
                        labelClassName="text-silk-primary"
                        placeholder="Seleccioná tu presupuesto"
                        value={watch('budget')}
                        register={register('budget', {
                           required: 'El presupuesto es obligatorio',
                        })}
                        errors={errors}
                        options={[
                           'Hasta 100 USD',
                           'Entre 100 y 250 USD',
                           'Entre 250 y 500 USD',
                           'Entre 500 y 1000 USD',
                           'Más de 1000 USD',
                        ]}
                     />

                     <SelectForm
                        name="startMoment"
                        label="¿Cuándo te gustaría empezar?"
                        labelClassName="text-silk-primary"
                        placeholder="Seleccioná cuándo empezar"
                        value={watch('startMoment')}
                        register={register('startMoment', {
                           required: 'El momento de inicio es obligatorio',
                        })}
                        errors={errors}
                        options={['Inmediatamente', 'El próximo mes', 'A convenir']}
                     />
                  </div>

                  <div className="flex justify-center">
                     <ActionButton
                        onClick={handleSubmit(handleCreateServiceRequest)}
                        variant="primary"
                        size="lg"
                        label="Enviar"
                        loadingLabel="Enviando..."
                        isLoading={isPending}
                     />
                  </div>
               </div>
            </>
         </CardContent>
      </Card>
   )
}
export default ContactForm

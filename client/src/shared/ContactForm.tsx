import { Mail, MapPin, Phone, User } from 'lucide-react'
import { Button, Card, CardContent } from '@shadcn'
import SelectForm from './SelectForm'
import InputForm from './InputForm'
import { useForm } from 'react-hook-form'
import { ServiceRequest } from '@models/Request.model'

type ServiceRequestFormData = Partial<ServiceRequest>

const initialFormData: ServiceRequestFormData = {
   name: '',
   phone: '',
   services: ['Colorimetria'],
   budget: '',
}

interface ContactFormProps {
   isServiceInputEnabled?: boolean
}

const ContactForm: React.FC<ContactFormProps> = ({ isServiceInputEnabled = false }) => {
   const {
      register,
      // reset: resetForm,
      // handleSubmit: handleFormSubmit,
      formState: { errors },
   } = useForm<ServiceRequestFormData>({
      mode: 'onChange',
      defaultValues: initialFormData,
   })

   return (
      <Card className="shadow-sm p-6 rounded-xl">
         <CardContent className="h-full">
            <>
               <div className="text-center">
                  <h3 className="text-2xl md:text-3xl font-semibold text-primary">
                     Tomá el primer paso
                  </h3>
               </div>

               <p className="text-center text-[13px] tracking-wide text-primary/80 uppercase">
                  Completa tus datos para recibir tu diagnóstico
               </p>

               <div className="space-y-4 mt-6">
                  <InputForm
                     type="text"
                     name="name"
                     label="Nombre Completo"
                     labelClassName="text-primary"
                     placeholder="Ingresá tu nombre"
                     register={register('name')}
                     errors={errors}
                     icon={User}
                  />

                  <div className="grid grid-cols-2 gap-4">
                     <InputForm
                        type="text"
                        name="ubication"
                        label="Ubicación"
                        labelClassName="text-primary"
                        placeholder="Ingresá tu ubicación"
                        register={register('age')}
                        errors={errors}
                        icon={MapPin}
                     />

                     {/* validar que solo sean numeros */}
                     <InputForm
                        type="tel"
                        name="phone"
                        label="Teléfono"
                        labelClassName="text-primary"
                        placeholder="Ingresá tu teléfono"
                        register={register('phone')}
                        errors={errors}
                        disabled={false}
                        icon={Phone}
                     />
                  </div>

                  <InputForm
                     type="email"
                     name="email"
                     label="Email"
                     labelClassName="text-primary"
                     placeholder="Ingresá tu email"
                     register={register('email')}
                     errors={errors}
                     icon={Mail}
                  />

                  {isServiceInputEnabled && (
                     <SelectForm
                        value=""
                        onChange={(value) => console.log('# service: ', value)}
                        label="¿Que tipo de servicio estas buscando?"
                        labelClassName="text-primary"
                        name="service"
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
                     />
                  )}

                  <div className="grid grid-cols-2 gap-4 items-end">
                     <SelectForm
                        value=""
                        onChange={(value) => console.log('# budget: ', value)}
                        label="¿Cual es tu presupuesto para ropa y accesorios?"
                        labelClassName="text-primary"
                        name="budget"
                        placeholder="Seleccionar"
                        options={[
                           {
                              label: 'Hasta 100 USD',
                              value: 'from-0-to-100',
                           },
                           {
                              label: 'Entre 100 y 300 USD',
                              value: 'from-100-to-300',
                           },
                           {
                              label: 'Entre 300 y 500 USD',
                              value: 'from-100-to-600',
                           },
                           {
                              label: 'Entre 500 y 700 USD',
                              value: 'from-100-to-800',
                           },
                           {
                              label: 'Entre 700 y 900 USD',
                              value: 'from-100-to-100',
                           },
                           {
                              label: 'Más de 1000 USD',
                              value: 'from-1000-to-x',
                           },
                        ]}
                     />

                     <SelectForm
                        value=""
                        onChange={(value) => console.log('# startDate: ', value)}
                        label="¿Cuándo te gustaría empezar?"
                        labelClassName="text-primary"
                        name="startMoment"
                        placeholder="Seleccionar"
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
                        onClick={() => alert('Hacer el quiz!')}
                        className="mt-2 px-15"
                        variant="default"
                        size="lg"
                     >
                        Enviar
                     </Button>
                  </div>
               </div>
            </>
         </CardContent>
      </Card>
   )
}
export default ContactForm

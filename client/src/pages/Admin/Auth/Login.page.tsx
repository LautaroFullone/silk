import { LogIn, UserLock, LockKeyhole, ArrowLeft } from 'lucide-react'
import { routesConfig } from '@config/routesConfig'
import ActionButton from '@shared/ActionButton'
import { useNavigate } from 'react-router-dom'
import useAppStore from '@stores/app.store'
import { useForm } from 'react-hook-form'
import InputForm from '@shared/InputForm'
import { useEffect } from 'react'
import { useAuth } from '@hooks'
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from '@shadcn'

interface LoginFormData {
   email: string
   password: string
}

const initialFormData: LoginFormData = {
   email: '',
   password: '',
}

const Login = () => {
   const navigate = useNavigate()

   // Auth hook y store
   const { login, isLoading } = useAuth()
   const user = useAppStore((state) => state.user)

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<LoginFormData>({
      mode: 'onSubmit',
      reValidateMode: 'onChange',
      defaultValues: initialFormData,
   })

   // Redirigir si ya está autenticado
   useEffect(() => {
      if (user) {
         navigate(routesConfig.ADMIN_DASHBOARD)
      }
   }, [user, navigate])

   const onSubmit = async (formData: LoginFormData) => {
      const result = await login(formData)

      if (result.success) {
         navigate(routesConfig.ADMIN_DASHBOARD)
      }
      // Los errores se muestran automáticamente via toast en useAuth
   }

   return (
      <div className="container py-15 md:py-20 space-y-10">
         <section className="max-w-md mx-auto">
            <Card>
               <CardHeader className="text-center">
                  <CardTitle className="font-very-vogue text-4xl font-normal text-silk-secondary">
                     Panel Administrativo
                  </CardTitle>
                  <CardDescription>
                     Ingresá tus credenciales para continuar
                  </CardDescription>
               </CardHeader>
               <CardContent className="space-y-4">
                  <InputForm
                     type="email"
                     name="email"
                     label="Email"
                     labelClassName="flex items-center gap-2 text-silk-secondary font-medium"
                     icon={UserLock}
                     placeholder="admin@silk.com"
                     className="h-12"
                     disabled={isLoading}
                     register={register('email', {
                        required: 'El email es obligatorio',
                        pattern: {
                           value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                           message: 'Ingresá un email válido',
                        },
                     })}
                     errors={errors}
                  />

                  <InputForm
                     type="password"
                     name="password"
                     label="Contraseña"
                     labelClassName="flex items-center gap-2 text-silk-secondary font-medium"
                     icon={LockKeyhole}
                     placeholder="Ingresá tu contraseña"
                     className="h-12"
                     disabled={isLoading}
                     register={register('password', {
                        required: 'La contraseña es obligatoria',
                        minLength: {
                           value: 6,
                           message: 'La contraseña debe tener al menos 6 caracteres',
                        },
                     })}
                     errors={errors}
                  />

                  <ActionButton
                     size="lg"
                     variant="primary"
                     icon={LogIn}
                     className="w-full"
                     label="Iniciar Sesión"
                     loadingLabel="Iniciando sesión..."
                     isLoading={isLoading}
                     disabled={isLoading}
                     onClick={handleSubmit(onSubmit)}
                  />
                  <ActionButton
                     size="lg"
                     variant="outline"
                     icon={ArrowLeft}
                     className="w-full"
                     label="Volver al sitio"
                     onClick={() => navigate(routesConfig.CLIENT_HOME)}
                  />
               </CardContent>

               <CardFooter>
                  <div className="text-center pt-4 ">
                     <p className="text-silk-secondary/60 text-sm italic font-light">
                        "Transformá vidas a través del color y el estilo"
                     </p>
                  </div>
               </CardFooter>
            </Card>
         </section>
      </div>
   )
}

export default Login

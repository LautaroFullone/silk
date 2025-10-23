import { routesConfig } from '@config/routesConfig'
import { Lock, LogIn, User } from 'lucide-react'
import ActionButton from '@shared/ActionButton'
import { useNavigate } from 'react-router-dom'
import { Input, Label } from '@shadcn'
import { useState } from 'react'

const Login = () => {
   const [name, setname] = useState('')
   const [password, setPassword] = useState('')

   const navigate = useNavigate()

   return (
      <div className="container py-15 md:py-20 space-y-10">
         <section className="max-w-md mx-auto">
            <div className="bg-white backdrop-blur-sm rounded-2xl p-8 border border-silk-secondary/20 space-y-8">
               <div className="text-center space-y-2">
                  <h1 className="font-very-vogue text-4xl text-silk-secondary">
                     Panel Administrativo
                  </h1>

                  <p className="text-silk-secondary/80 text-sm">
                     Ingresá tus credenciales para continuar
                  </p>
               </div>

               <div className="space-y-6">
                  <div className="space-y-3">
                     <Label
                        htmlFor="name"
                        className="flex items-center gap-2 text-silk-secondary font-medium"
                     >
                        <User className="h-4 w-4 text-silk-secondary/60" />
                        Usuario
                     </Label>
                     <Input
                        id="name"
                        placeholder="Ingresá tu usuario"
                        value={name}
                        onChange={(e) => setname(e.target.value)}
                        className="bg-white/80 backdrop-blur-sm border-silk-secondary/30 text-silk-secondary placeholder:text-silk-secondary/60 h-12"
                     />
                  </div>

                  <div className="space-y-3">
                     <Label
                        htmlFor="password"
                        className="flex items-center gap-2 text-silk-secondary font-medium"
                     >
                        <Lock className="h-4 w-4 text-silk-secondary/60" />
                        Contraseña
                     </Label>
                     <Input
                        id="password"
                        type="password"
                        placeholder="Ingresá tu contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-white/80 backdrop-blur-sm border-silk-secondary/30 text-silk-secondary placeholder:text-silk-secondary/60 h-12"
                     />
                  </div>

                  <div className="pt-4">
                     <ActionButton
                        size="xl"
                        variant="primary"
                        icon={LogIn}
                        className="w-full group relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                        label="Iniciar Sesión"
                        loadingLabel="Iniciando..."
                        onClick={() => navigate(routesConfig.ADMIN_DASHBOARD)}
                     />
                  </div>
               </div>

               <div className="text-center pt-4 border-t border-silk-secondary/20">
                  <p className="text-silk-secondary/60 text-sm italic font-light">
                     "Transformá vidas a través del color y el estilo"
                  </p>
               </div>
            </div>
         </section>
      </div>
   )
}

export default Login

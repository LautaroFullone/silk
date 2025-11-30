import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
   throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
   auth: {
      autoRefreshToken: true, // Habilitar refresco automático de tokens
      persistSession: true, // Habilitar persistencia automática de sesión
      detectSessionInUrl: true, // Habilitar detección de sesión en URL
   },
})

export default supabase

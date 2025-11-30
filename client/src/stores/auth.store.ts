import { User } from '@supabase/supabase-js'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface AuthState {
   user: User | null
   isAuthenticated: boolean
   isInitialized: boolean
   isLoading: boolean

   actions: {
      setUser: (user: User | null) => void
      setLoading: (loading: boolean) => void
      setInitialized: (initialized: boolean) => void
      reset: () => void
   }
}

const INITIAL_STATE = {
   user: null,
   isAuthenticated: false,
   isInitialized: false,
   isLoading: false,
}

export const useAuthStore = create<AuthState>()(
   devtools(
      (set) => ({
         ...INITIAL_STATE,
         actions: {
            setUser: (user) =>
               set({
                  user,
                  isAuthenticated: !!user,
               }),

            setLoading: (isLoading) => set({ isLoading }),

            setInitialized: (isInitialized) => set({ isInitialized }),

            reset: () => set(INITIAL_STATE),
         },
      }),
      { name: 'auth-store' }
   )
)
export default useAuthStore

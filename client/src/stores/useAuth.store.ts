import { User } from '@supabase/supabase-js'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface AuthState {
   user: User | null
   isAuthenticated: boolean
   isInitialized: boolean

   actions: {
      setUser: (user: User | null) => void
      setInitialized: (initialized: boolean) => void
      resetStore: () => void
   }
}

const INITIAL_STATE = {
   user: null,
   isAuthenticated: false,
   isInitialized: false,
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
            setInitialized: (isInitialized) => set({ isInitialized }),
            resetStore: () => set(INITIAL_STATE),
         },
      }),
      { name: 'auth-store' }
   )
)

export default useAuthStore

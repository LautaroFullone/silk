import { User } from '@supabase/supabase-js'
import { devtools } from 'zustand/middleware'
import { create } from 'zustand'

interface AppStoreProps {
   user: User | null

   actions: {
      dispatchUser: (user: User | null) => void
   }
}

const INITIAL_STATE: Omit<AppStoreProps, 'actions'> = {
   user: null,
}

const useAppStore = create<AppStoreProps>()(
   devtools(
      (set) => ({
         ...INITIAL_STATE,

         actions: {
            dispatchUser: (user) => set({ user }),
         },
      }),
      { name: 'app-store' }
   )
)

export default useAppStore

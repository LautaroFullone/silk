import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import Test from './pages/Test'

import './styles.css'

createRoot(document.getElementById('root')!).render(
   <StrictMode>
      <div>
         <p className="bg-amber-500 font-light ">Welcome to Silk!</p>
         <div className="flex min-h-svh flex-col items-center justify-center ">
            <Test />
         </div>
      </div>
   </StrictMode>
)

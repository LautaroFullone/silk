import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import Router from './Router'

import './styles.css'

createRoot(document.getElementById('root')!).render(
   <StrictMode>
      <Router />
   </StrictMode>
)

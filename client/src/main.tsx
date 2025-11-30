import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClientProvider } from '@tanstack/react-query'
import { HelmetProvider } from 'react-helmet-async'
import { queryClient } from '@lib/queryClient'
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import './styles.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
   <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      <StrictMode>
         <HelmetProvider>
            <App />
         </HelmetProvider>
      </StrictMode>
   </QueryClientProvider>
)

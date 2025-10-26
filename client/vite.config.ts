import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
   plugins: [react(), tailwindcss()],
   resolve: {
      alias: {
         '@config': path.resolve(__dirname, './src/config'),
         '@hooks': path.resolve(__dirname, './src/hooks'),
         '@layouts': path.resolve(__dirname, './src/layouts'),
         '@lib': path.resolve(__dirname, './src/lib'),
         '@models': path.resolve(__dirname, './src/models'),
         '@pages': path.resolve(__dirname, './src/pages'),
         '@services': path.resolve(__dirname, './src/services'),
         '@shared': path.resolve(__dirname, './src/shared'),
         '@stores': path.resolve(__dirname, './src/stores'),
         '@utils': path.resolve(__dirname, './src/utils'),
         '@shadcn': path.resolve(__dirname, './src/shared/shadcn/ui'),
      },
   },
   define: {
      __APP_ENV__: JSON.stringify(process.env.VITE_VERCEL_ENV),
   },
   build: {
      minify: 'esbuild',

      // 📦 Configuraciones de producción optimizadas
      sourcemap: false,
      target: 'esnext',

      rollupOptions: {
         output: {
            // 🔀 Code splitting inteligente
            manualChunks: {
               // Librerías principales
               vendor: ['react', 'react-dom'],

               // Router y estado
               routing: ['react-router-dom', 'zustand'],

               // Queries y HTTP
               data: ['@tanstack/react-query', 'axios'],
            },
         },
      },

      // 🎯 Configuraciones adicionales de rendimiento
      chunkSizeWarningLimit: 1000,
      assetsDir: 'assets',
   },

   // 🔧 Optimizaciones para desarrollo
   server: {
      port: 5174,
      host: true,
   },

   // 📦 Optimizar dependencias
   optimizeDeps: {
      include: [
         'react',
         'react-dom',
         'react-router-dom',
         '@tanstack/react-query',
         'axios',
         'zustand',
      ],
   },
})

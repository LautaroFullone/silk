import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
   plugins: [react(), tailwindcss()],
   server: {
      // host: true, // expone el front en la LAN (0.0.0.0)
      port: 5174, // o el que uses
      // proxy: {
      //    // todo lo que empiece con /api va a tu backend local
      //    '/api': {
      //       target: 'http://127.0.0.1:3031', // En desarrollo usa localhost
      //       changeOrigin: true,
      //       secure: false,
      //    },
      // },
   },
   build: {
      outDir: 'dist',
      sourcemap: false,
      minify: 'terser',
      rollupOptions: {
         output: {
            manualChunks: {
               vendor: ['react', 'react-dom'],
               router: ['react-router-dom'],
               ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
            },
         },
      },
   },
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
})

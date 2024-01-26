import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@emotion/react', '@emotion/styled'],
  },
  server:{
    port:5000
  },
  build:{
    chunkSizeWarningLimit:1024*1500
  }

})
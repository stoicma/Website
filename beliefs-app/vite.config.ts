import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/beliefs/',
  build: {
    outDir: '../beliefs',
    emptyOutDir: true,
  },
})

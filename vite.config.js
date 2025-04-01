import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    allowedHosts: [
      'medstart-qogg.onrender.com',
      // Add other allowed hosts if needed
    ],
  },
  plugins: [react()],
})

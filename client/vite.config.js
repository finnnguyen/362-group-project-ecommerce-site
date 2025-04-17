import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  proxy: {
    "/api": {
      target: "http://localhost:1337",
      changeOrigin: true,
      secure: false
    }
  }
})

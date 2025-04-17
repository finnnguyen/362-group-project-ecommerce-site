import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  proxy: {
    "/api": {
      target: "http://localhost:1337",
      changeOrigin: true,
      secure: false
    }
  }
})

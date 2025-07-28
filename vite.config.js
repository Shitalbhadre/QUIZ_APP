import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/QUIZ_APP/', // 👈 required for GitHub Pages
  plugins: [react()],
})

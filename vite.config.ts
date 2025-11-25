import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Indlæs miljøvariabler baseret på mode (development/production)
  const env = loadEnv(mode, (process as any).cwd(), '');
  
  return {
    plugins: [react()],
    define: {
      // Dette gør process.env.API_KEY tilgængelig i browseren
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  }
})
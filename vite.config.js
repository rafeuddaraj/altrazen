import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'firebase/app': 'firebase/compat/app',
      'firebase/database': 'firebase/compat/database',
    },
  },
})

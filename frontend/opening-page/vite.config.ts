import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      // Allow importing shared files outside this Vite root (contacts, chat-ai)
      allow: [
        '..',
        '/Users/emilyan/Documents/GitHub/Technica/frontend/contacts',
        '/Users/emilyan/Documents/GitHub/Technica/frontend/chat-ai',
      ],
    },
  },
})


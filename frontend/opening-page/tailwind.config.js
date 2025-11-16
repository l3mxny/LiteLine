/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
    // Include shared UI imported from sibling apps
    '../contacts/**/*.{ts,tsx}',
    '../chat-ai/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}



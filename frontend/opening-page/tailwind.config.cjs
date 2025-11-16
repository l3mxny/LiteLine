/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "system-ui", "sans-serif"],
      },
      colors: {
        safeblue: {
          50: "#e0f4ff",
          100: "#b3e0ff",
          500: "#53c0ff",
          700: "#1e88e5",
          900: "#020617",
        },
      },
      boxShadow: {
        "glow-blue": "0 0 35px rgba(83,192,255,0.9)",
      },
      keyframes: {
        "logo-thump": {
          "0%, 100%": {
            transform: "scale(1)",
            boxShadow: "0 0 35px rgba(83,192,255,0.7)",
          },
          "50%": {
            transform: "scale(1.06)",
            boxShadow: "0 0 55px rgba(83,192,255,1)",
          },
        },
      },
      animation: {
        "logo-thump": "logo-thump 1.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};



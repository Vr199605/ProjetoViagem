/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        navy: {
          900: '#070F1E',
          800: '#0A192F',
          700: '#112240',
          600: '#1E3A5F',
        },
        sand: {
          50: '#FDFBF9',
          100: '#F7F3EE',
          200: '#EFE7DE',
          300: '#DECFC0',
          400: '#C8B59E',
        },
        emerald: {
          500: '#10B981',
          600: '#059669',
          700: '#047857',
        },
        gold: {
          400: '#DFB76C',
          500: '#C5A059',
          600: '#A98239',
        }
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(10, 25, 47, 0.05), 0 2px 6px -1px rgba(10, 25, 47, 0.02)',
        'luxury': '0 20px 40px -15px rgba(10, 25, 47, 0.08), 0 0 1px 1px rgba(10, 25, 47, 0.03)',
        'modal': '0 25px 60px -15px rgba(10, 25, 47, 0.25)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
}

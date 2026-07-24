/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          950: '#080c14',
          900: '#0f172a',
          850: '#131d33',
          800: '#1e293b',
          700: '#334155',
        },
        brand: {
          cyan: '#00e5ff',
          blue: '#3b82f6',
          violet: '#6366f1',
          emerald: '#10b981',
          amber: '#f59e0b',
        }
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'Space Mono', 'monospace'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #00e5ff 0%, #3b82f6 50%, #6366f1 100%)',
        'glass-card': 'linear-gradient(180deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.85) 100%)',
      },
      boxShadow: {
        'cyan-glow': '0 0 25px -5px rgba(0, 229, 255, 0.3)',
        'blue-glow': '0 0 25px -5px rgba(59, 130, 246, 0.3)',
      }
    },
  },
  plugins: [],
}

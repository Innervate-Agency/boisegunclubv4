/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      maxWidth: {
        '8xl': '1600px',
      },
      colors: {
        background: 'var(--background)',
        backgroundSecondary: 'var(--background-secondary)',
        text: 'var(--text)',
        textSecondary: 'var(--text-secondary)',
        accent: 'var(--accent)',
        accentHover: 'var(--accent-hover)',
        border: 'var(--border)',
        terminalGreen: 'var(--terminal-green)',
        terminalAmber: 'var(--terminal-amber)',
      },
      fontFamily: {
        'heading': ['refrigerator-deluxe', 'sans-serif'],
        'body': ['museo-sans', 'sans-serif'],
        'vt323': ['VT323', 'monospace'],
        'space-grotesk': ['Space Grotesk', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'drift': 'drift 10s ease-in-out infinite',
      },
      keyframes: {
        pulse: {
          '0%, 100%': {
            opacity: 1,
          },
          '50%': {
            opacity: 0.5,
          },
        },
        drift: {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-20px)',
          },
        },
      },
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ['./src/**/*.tsx', './*.html'],
  theme: {
    screens: {
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
    extend: {
      backgroundImage: {
        galaxy: "url('/images/background-galaxy.png')",
        'nlw-gradient':
          'linear-gradient(89.86deg, #9572FC 23.08%, #43E7AD 33.94%, #E1D55D 44.57%)',
        'game-overlay':
          'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 67.08%)',
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(calc(100% + 24px))' },
          '100%': { transform: 'translateX(0px)' },
        },
        swipeOut: {
          '0%': { transform: 'translateX(0px)' },
          '100%': { transform: 'translateX(calc(100% + 24px))' },
        },
      },
      animation: {
        slideIn: 'slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        swipeOut: 'swipeOut 150ms cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant('state', '&[data-state="on"]')
      addVariant('highlighted', '&[data-highlighted]')
      addVariant('toaster-open', '&[data-state="open"]')
      addVariant('toaster-closed', '&[data-state="closed"]')
    }),
  ],
}

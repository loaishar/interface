/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'fill-white': 'var(--fill-white)',
        'fill-tsp-white-main': 'var(--fill-tsp-white-main)',
        'fill-tsp-white-dark': 'var(--fill-tsp-white-dark)',
        'fill-tsp-gray-main': 'var(--fill-tsp-gray-main)',
        'border-main': 'var(--border-main)',
        'border-light': 'var(--border-light)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-tertiary': 'var(--text-tertiary)',
        'text-disable': 'var(--text-disable)',
        'icon-brand': 'var(--icon-brand)',
        'function-success': 'var(--function-success)',
        'function-error': 'var(--function-error)',
        'function-warning': 'var(--function-warning)',
        'function-info': 'var(--function-info)',
        'background-gray-main': 'var(--background-gray-main)',
        'background-terminal': 'var(--background-terminal)',
        'background-code': 'var(--background-code)',
        'background-error': 'var(--background-error)',
        'background-success': 'var(--background-success)',
      },
      fontFamily: {
        'manus-im-inter-semi-bold': 'var(--font-manus-im-inter-semi-bold)',
        'manus-im-libre-baskerville-regular': 'var(--font-manus-im-libre-baskerville-regular)',
      },
    },
  },
  plugins: [],
}
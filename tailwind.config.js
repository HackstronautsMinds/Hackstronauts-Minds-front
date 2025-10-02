/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '20': 'repeat(20, minmax(0, 1fr))',
        '32': 'repeat(32, minmax(0, 1fr))',
      },
      gridTemplateRows: {
        '10': 'repeat(10, minmax(0, 1fr))',
        '24': 'repeat(24, minmax(0, 1fr))',
      },
      width: {
        '128': '32rem',
      },
      height: {
        '128': '32rem',
      },
      perspective: {
        '1000': '1000px',
        '1200': '1200px',
      },
      transformStyle: {
        'preserve-3d': 'preserve-3d',
      },
      rotate: {
        'X-12': 'rotateX(12deg)',
        'X-15': 'rotateX(15deg)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}

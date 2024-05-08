/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        textAccent: '#cc733f',
        hoverColor: '#ffb554',
        //@ 30% transparency
        backgroundBlue: '#cce5ff',
        //Buttons -orange/900/90 active,
        // -orange/900 hover
        // -orange/50 inactive
      },
    },
  },
  plugins: [],
};
//textAccent: '#8CC9FF',

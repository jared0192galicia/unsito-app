/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        valera: ['font-valera', 'ValeraRound'],
        jaldi: ['font-jaldi', 'Jaldi'],
        lexend: ['Lexend', 'sans-serif'],
        karma: ['Karma'],
        inter: ['Inter', 'sans-serif'],
        manjari: ['Manjari', 'sans-serif'],
        rounded: ['"Arial Rounded MT Bold"', 'Arial', 'sans-serif'],
      },
      colors: {
        'app-blue-900': '#09344F',
        'app-blue-800': '#0E3D5B',
        'app-blue-700': '#295A78',
        'app-blue-600': '#77A5C2',

        'app-burgundy-900': '#79170F',
        'app-burgundy-800': '#973F38',
        'app-burgundy-700': '#B87974',
        'app-burgundy-600': '#D8B4B1',

        'app-text-900': '#202020',
        'app-gray-800': '#323232',
        'app-gray-700': '#9D9D9D',
        'app-gray-text': '#5F5F72',

        'app-soft-white': '#E8EFF3',
        'app-white': '#FAFAFF',
      },
      backgroundImage: {
        hero: "url('/hero.png')",
        'hero-gracias': "url('/images/gracias.jpg')"
      },
      keyframes: {
        deployKey: {
          '0%': { height: '0%' },
          '100%': { height: '100%' }
        }
      },
      animation: {
        deploy: 'deployKey 5s ease-in-out' // Ajusta la duración si es necesario
      }
    }
  },
  plugins: []
};
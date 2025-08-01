/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/stories/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Fustat', 'ui-sans-serif', 'system-ui'],
        'fustat': ['Fustat'],
      },
      colors: {
        'primary': {
          '50': '#E3DFDA', 
          '100':'#E3E9E2',
          '500': '#566359', 
          '600': '#4C574F', 
          '700': '#3E4942', 
          '800': '#29382C', 
        },
        'greyscale': {
            '100': '#FBFAF9',
            '200': '#F7F5F3',
            '300': '#EFECE9',
            '400': '#E3DFDA',
            '500': '#D4D0CB',
            '600': '#A29D98',
            '700': '#696663',
            '800': '#3C3A37',
            '900': '#2D2A27',


        },
        'error': {
          '100': '#F03538',  
          '110': '#E01F22',  
          '150': '#B91619',  
          '50': '#FBE4E4',  
        }
      }
    },
  },
  plugins: [],
}
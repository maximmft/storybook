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
          '100': '#E3DFDA',  
          '600': '#4C574F', 
          '700': '#3E4942', 
          '800': '#29382C', 
        },
        'greyscale': {
            '200': '#F7F5F3',
            '300': '#EFECE9',
            '400': '#E3DFDA',
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
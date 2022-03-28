module.exports = {
  content: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  corePlugins: {
    preflight: false,
  },
  mode: 'jit',
  darkMode: 'media',
  theme: {
    colors: {
      'dark-grey': '#707070',
      'medium-grey': '#11111152',
      'light-grey': '#EFEFEF',
      black: '#000',
      white: '#fff',
    },
    screens: {
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      '2xl': '1440px',
    },
    extend: {
      fontFamily: {
        helvetica: ['Helvetica Neue'],
        montserrat: ['Montserrat'],
        roboto: ['Roboto'],
      },
    },
  },
  important: true,
  plugins: [],
}
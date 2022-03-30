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
      'drop-shadow': '#04228E1A',
      'footer-bg': '#ECECEC',
      'nav-odd': '#E9E5E5',
      'nav-even': '#E0DEDE',
      black: '#000',
      white: '#fff',
      green: '#1AB16A',
    },
    screens: {
      sm: '576px',
      md: '800px',
      lg: '1190px',
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

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  target: 'static',
  generate: {
    fallback: true,
  },
  loading: { color: '#1ab16a' },
  head: {
    title: 'overhaul',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  googleAnalytics: {
    id: process.env.ANALYTICS_ID,
    ecommerce: {
      enabled: true,
    },
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['vue2-animate/dist/vue2-animate.min.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ['@nuxtjs/google-analytics'],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    [
      'nuxt-fontawesome',
      {
        imports: [
          {
            set: '@fortawesome/free-solid-svg-icons',
            icons: ['fas'],
          },
          {
            set: '@fortawesome/free-brands-svg-icons',
            icons: ['fab'],
          },
        ],
      },
    ],
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: true,
    extend(config, {}) {
      config.node = {
        fs: 'empty',
      }
    },
    postcss: {
      plugins: {
        'postcss-for': {},
        'postcss-import': true,
        'postcss-nested': {},
        'postcss-color-mod-function': {
          transformVars: true,
        },
        'postcss-momentum-scrolling': {},
        'postcss-calc': {},
        'postcss-flexbugs-fixes': {},
        'postcss-clean': {},
      },
      preset: {
        // Change the postcss-preset-env settings
        stage: 1,
      },
    },
  },
}

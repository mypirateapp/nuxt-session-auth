module.exports = {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/auth',
  ],
  /*
   ** Auth module configuration
   ** See https://auth.nuxtjs.org/api/options.html
   */
  auth: {
    cookie: { options: { expires: 1 } },
    watchLoggedIn: false,
    plugins: ['~/middleware/sessionAuth.js'],
    strategies: {
      local: {
        tokenRequired: false,
        tokenType: false,
        endpoints: {
          login: {
            method: 'POST',
            url: '/api/v1/sessions',
            propertyName: 'user',
          },

          logout: {
            method: 'DELETE',
            url: '/api/v1/sessions/@me',
          },

          user: {
            method: 'GET',
            url: '/api/v1/sessions/@me',
            propertyName: 'user',
          },
        },
      },
      facebook: {
        response_type: 'code',
        client_id: '1787917724841147',
        client_secret: '1bcc3243a3442274317f67c84b71a691',
        userinfo_endpoint: false,
        access_token_endpoint: '/api/v1/auth/facebook',
        scope: ['public_profile', 'email'],
      },
    },
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
  },
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      api_endpoint:
        'https://gd7oaxfgpd.execute-api.ap-southeast-2.amazonaws.com/api'
    }
  },
  modules: [
    // ...
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxt/devtools'
  ],

  alias: {
    '@store': './src/store',
    '@plugins': './src/plugins',
    '@custom-auth': './src/auth',
    '@types': './src/types',
    '@gtag': './src/gtag',
    'mpt-types': '../core/types'
  },

  css: ['@/assets/css/main.css', '@/assets/css/base.css'],

  devtools: {
    enabled: true,
    vscode: {}
  }
})

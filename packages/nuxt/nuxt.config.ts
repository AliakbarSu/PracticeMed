// https://nuxt.com/docs/api/configuration/nuxt-config
import { local } from '../../resources/stages'
import path from 'path'
const alias =
  process.env.LOCAL_ENV == local
    ? {}
    : {
        'vue/server-renderer': path.resolve(
          __dirname,
          './node_modules/vue/server-renderer'
        )
      }

export default defineNuxtConfig({
  app: {
    head: {
      script: [
        {
          id: 'gtmHead',
          innerHTML: `
          (function (w, d, s, l, i) {
            w[l] = w[l] || []
            w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' })
            var f = d.getElementsByTagName(s)[0],
              j = d.createElement(s),
              dl = l != 'dataLayer' ? '&l=' + l : ''
            j.async = true
            j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl
            f.parentNode.insertBefore(j, f)
          })(window, document, 'script', 'dataLayer', 'GTM-K9LRZTF');`
        }
      ],
      htmlAttrs: {
        class: 'h-full',
        lang: 'en'
      },
      bodyAttrs: {
        class: 'h-full'
      },
      link: [
        {
          href: 'https://rsms.me/inter/inter.css',
          rel: 'stylesheet'
        }
      ],
      meta: [
        { charset: 'UTF-8' },
        { name: 'theme-color', content: '#ffffff' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  },
  runtimeConfig: {
    public: {
      api_endpoint: '',
      hygraph_endpoint: '',
      domain_name: '',
      cdn_url: ''
    }
  },
  modules: ['@pinia/nuxt', '@nuxt/devtools'],

  alias: {
    '@store': './src/store',
    '@plugins': './src/plugins',
    '@custom-auth': './src/auth',
    '@types': './src/types',
    '@gtag': './src/gtag',
    'mpt-types': '../core/types',
    ...alias
  },

  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/css/main.css" as *;'
        }
      }
    }
  },

  devtools: {
    enabled: true,
    vscode: {}
  },
  nitro: {
    preset: 'aws-lambda'
  }
})

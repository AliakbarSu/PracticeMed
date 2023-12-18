// https://nuxt.com/docs/api/configuration/nuxt-config
import { dev, local, prod } from '../../resources/stages'
import { endpoints } from '../../resources/endpoints'
import path from 'path'
let cdn = `http://localhost:3000`
if (process.env.LOCAL_ENV == dev) {
  cdn = 'https://' + endpoints.custom_domains.cdn.dev
} else if (process.env.LOCAL_ENV == prod) {
  cdn = 'https://' + endpoints.custom_domains.cdn.prod
}

const alias =
  process.env.LOCAL_ENV == local
    ? {}
    : {
        'vue/server-renderer': path.resolve(
          __dirname,
          '../../node_modules/vue/server-renderer'
        )
      }

export default defineNuxtConfig({
  app: {
    cdnURL: cdn,
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
        },
        {
          href: cdn + '/assets/favicons/apple-icon-57x57.png',
          rel: 'apple-touch-icon',
          sizes: '57x57'
        },
        {
          rel: 'apple-touch-icon',
          sizes: '60x60',
          href: cdn + '/assets/favicons/apple-icon-60x60.png'
        },
        {
          rel: 'apple-touch-icon',
          sizes: '72x72',
          href: cdn + '/assets/favicons/apple-icon-72x72.png'
        },
        {
          rel: 'apple-touch-icon',
          sizes: '76x76',
          href: cdn + '/assets/favicons/apple-icon-76x76.png'
        },
        {
          rel: 'apple-touch-icon',
          sizes: '114x114',
          href: cdn + '/assets/favicons/apple-icon-114x114.png'
        },
        {
          rel: 'apple-touch-icon',
          sizes: '120x120',
          href: cdn + '/assets/favicons/apple-icon-120x120.png'
        },
        {
          rel: 'apple-touch-icon',
          sizes: '144x144',
          href: cdn + '/assets/favicons/apple-icon-144x144.png'
        },
        {
          rel: 'apple-touch-icon',
          sizes: '152x152',
          href: cdn + '/assets/favicons/apple-icon-152x152.png'
        },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: cdn + '/assets/favicons/apple-icon-180x180.png'
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '192x192',
          href: cdn + '/assets/favicons/android-icon-192x192.png'
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: cdn + '/assets/favicons/favicon-32x32.png'
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '96x96',
          href: cdn + '/assets/favicons/favicon-96x96.png'
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: cdn + '/assets/favicons/favicon-16x16.png'
        },
        {
          rel: 'manifest',
          href: cdn + '/assets/favicons/manifest.json'
        }
      ],
      meta: [
        { charset: 'UTF-8' },
        { name: 'theme-color', content: '#ffffff' },
        {
          name: 'msapplication-TileImage',
          content: cdn + '/assets/favicons/ms-icon-144x144.png'
        },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  },
  runtimeConfig: {
    public: {
      hygraph_endpoint:
        'https://api-ap-southeast-2.hygraph.com/v2/clgn1doxk5et901ug6uub1w1u/master'
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

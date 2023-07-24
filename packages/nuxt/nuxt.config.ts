// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    cdnURL: 'https://dsl7ar6bugrck.cloudfront.net',
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
          href: 'https://d5rgciykbursv.cloudfront.net/assets/favicons/apple-icon-57x57.png',
          rel: 'apple-touch-icon',
          sizes: '57x57'
        },
        {
          rel: 'apple-touch-icon',
          sizes: '60x60',
          href: 'https://d5rgciykbursv.cloudfront.net/assets/favicons/apple-icon-60x60.png'
        },
        {
          rel: 'apple-touch-icon',
          sizes: '72x72',
          href: 'https://d5rgciykbursv.cloudfront.net/assets/favicons/apple-icon-72x72.png'
        },
        {
          rel: 'apple-touch-icon',
          sizes: '76x76',
          href: 'https://d5rgciykbursv.cloudfront.net/assets/favicons/apple-icon-76x76.png'
        },
        {
          rel: 'apple-touch-icon',
          sizes: '114x114',
          href: 'https://d5rgciykbursv.cloudfront.net/assets/favicons/apple-icon-114x114.png'
        },
        {
          rel: 'apple-touch-icon',
          sizes: '120x120',
          href: 'https://d5rgciykbursv.cloudfront.net/assets/favicons/apple-icon-120x120.png'
        },
        {
          rel: 'apple-touch-icon',
          sizes: '144x144',
          href: 'https://d5rgciykbursv.cloudfront.net/assets/favicons/apple-icon-144x144.png'
        },
        {
          rel: 'apple-touch-icon',
          sizes: '152x152',
          href: 'https://d5rgciykbursv.cloudfront.net/assets/favicons/apple-icon-152x152.png'
        },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: 'https://d5rgciykbursv.cloudfront.net/assets/favicons/apple-icon-180x180.png'
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '192x192',
          href: 'https://d5rgciykbursv.cloudfront.net/assets/favicons/android-icon-192x192.png'
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: 'https://d5rgciykbursv.cloudfront.net/assets/favicons/favicon-32x32.png'
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '96x96',
          href: 'https://d5rgciykbursv.cloudfront.net/assets/favicons/favicon-96x96.png'
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: 'https://d5rgciykbursv.cloudfront.net/assets/favicons/favicon-16x16.png'
        },
        {
          rel: 'manifest',
          href: 'https://d5rgciykbursv.cloudfront.net/assets/favicons/manifest.json'
        }
      ],
      meta: [
        { charset: 'UTF-8' },
        { name: 'theme-color', content: '#ffffff' },
        {
          name: 'msapplication-TileImage',
          content:
            'https://d5rgciykbursv.cloudfront.net/assets/favicons/ms-icon-144x144.png'
        },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  },
  runtimeConfig: {
    public: {
      api_endpoint: 'https://dev.practicemed.org/api',
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
    'mpt-types': '../core/types'
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

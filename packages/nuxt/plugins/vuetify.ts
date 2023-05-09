// import 'mdi/fonts/materialdesignicons-webfont.ttf'
// // Vuetify
// import 'vuetify/styles'
// import { createVuetify } from 'vuetify'
// import * as components from 'vuetify/components'
// import * as directives from 'vuetify/directives'

// const vuetify = createVuetify({
//   ssr: true,
//   components,
//   directives
// })

export default defineNuxtPlugin((nuxtApp) => {
  if (process.client) {
    // nuxtApp.vueApp.use(vuetify)
  }
})

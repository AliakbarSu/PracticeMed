import nuxtConfig from 'nuxt.config'
import VueApexCharts from 'vue3-apexcharts'

export default defineNuxtPlugin((nuxtApp) => {
  if (process.client) {
    nuxtApp.vueApp.component('apexchart', VueApexCharts)
  }
})

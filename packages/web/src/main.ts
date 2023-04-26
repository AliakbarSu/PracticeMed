import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { store } from './store/index'

import './main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

import VueApexCharts from 'vue3-apexcharts'
app.use(VueApexCharts)
app.component('apexchart', VueApexCharts)

import VueSweetalert2 from 'vue-sweetalert2'
app.use(VueSweetalert2)

import vuetify from './plugins/vuetify'
app.use(vuetify)

// Vuex - Store
app.use(store)

import auth0 from '@/auth/index'
app.use(auth0())

app.mount('#app')

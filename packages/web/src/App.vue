<template>
  <v-app app>
    <ErrorAlert v-if="error" />
    <Navbar />
    <v-main>
      <router-view />
    </v-main>

    <Footer />
  </v-app>
</template>
<script lang="ts" setup>
import { RouterView } from 'vue-router'
import { onBeforeMount, watch } from 'vue'
import Footer from '@/components/UI/footer/footer.vue'
import Navbar from '@/components/UI/navbar/navbar.vue'
import { useAuth0 } from '@auth0/auth0-vue'
import { useAppStore } from './store/main'
import { storeToRefs } from 'pinia'
import ErrorAlert from './components/UI/alerts/error.vue'
import { useUIStore } from './store/UI'
const store = useAppStore()
const UIStore = useUIStore()

const { authToken } = storeToRefs(store)
const { error } = storeToRefs(UIStore)

const { isAuthenticated, getAccessTokenSilently } = useAuth0()

watch(isAuthenticated, async () => {
  if (isAuthenticated) {
    const token = await getAccessTokenSilently()
    store.setAuthToken(token)
  }
})

watch(authToken, async () => {
  if (authToken.value) {
    store.fetchProfileData()
    store.fetchTests()
    store.fetchTestsHistory()
    store.fetchPortalLink()
  }
})

onBeforeMount(async () => {
  // try {
  //   const token = await getAccessTokenSilently()
  //   axios.interceptors.request.use(function (config) {
  //     config.headers.Authorization = token ? `Bearer ${token}` : ''
  //     return config
  //   })
  // } catch (err) {}
  // axios.interceptors.response.use(undefined, function (err) {
  //   return new Promise(function () {
  //     if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
  // if you ever get an unauthorized, logout the user
  // this.$store.dispatch('authLogout')
  // you can also redirect to /login if needed !
  //     }
  //     throw err
  //   })
  // })
})
</script>

<template>
  <v-app app>
    <!-- <Alert /> -->
    <Navbar />
    <v-main>
      <router-view />
    </v-main>

    <Footer />
  </v-app>
</template>
<script lang="ts" setup>
import { RouterView } from 'vue-router'
import { onBeforeMount } from 'vue'
import Footer from '@/components/UI/footer/footer.vue'
import Navbar from '@/components/UI/navbar/navbar.vue'
// import Alert from '@/components/UI/alert/alert.vue'
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-vue'
const { getAccessTokenSilently } = useAuth0()
onBeforeMount(async () => {
  try {
    const token = await getAccessTokenSilently()
    axios.interceptors.request.use(function (config) {
      config.headers.Authorization = token ? `Bearer ${token}` : ''
      return config
    })
  } catch (err) {}

  axios.interceptors.response.use(undefined, function (err) {
    return new Promise(function () {
      if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
        // if you ever get an unauthorized, logout the user
        // this.$store.dispatch('authLogout')
        // you can also redirect to /login if needed !
      }
      throw err
    })
  })
})
</script>

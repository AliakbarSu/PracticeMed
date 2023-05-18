<template>
  <NuxtLayout>
    <UIAlertsError v-if="error" />
    <NuxtPage />
  </NuxtLayout>
</template>
<script lang="ts" setup>
import { useUIStore } from './src/store/UI'
import { useAppStore } from './src/store/main'
import { storeToRefs } from 'pinia'
import { useAuth0 } from '@auth0/auth0-vue'

const store = useAppStore()
const UIStore = useUIStore()

const { authToken } = storeToRefs(store)
const { error } = storeToRefs(UIStore)

// Composition API
const auth0 = process.client ? useAuth0() : undefined
if (process.client) await auth0?.checkSession()
const isAuthenticated = computed(() => {
  return auth0?.isAuthenticated.value
})

watch(
  isAuthenticated,
  async () => {
    if (isAuthenticated.value) {
      const token = await auth0?.getAccessTokenSilently()
      store.setAuthToken(token || '')
    }
  },
  { immediate: true }
)

watch(
  authToken,
  () => {
    if (authToken.value && process.client) {
      store.fetchProfileData()
      store.fetchTests()
      store.fetchTestsHistory()
      store.fetchPortalLink()
    }
  },
  { immediate: true }
)

useSeoMeta({
  title: 'Practice Med',
  ogTitle: 'Practice Med - Home',
  ogDescription: 'Ace Your Medical Tests with Confidence',
  ogImage:
    'https://res.cloudinary.com/dxuf2ssx6/image/upload/c_scale,w_1200/v1682630656/practiceMed/Illustrations/hero_image.png',
  ogUrl: 'https://www.practicemed.org'
})
</script>

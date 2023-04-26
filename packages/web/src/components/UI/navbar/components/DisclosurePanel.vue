<template>
  <DisclosurePanel class="md:hidden">
    <div class="space-y-1 pb-3 pt-2">
      <!-- Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" -->
      <DisclosureButton
        as="a"
        href="#"
        class="block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700 sm:pl-5 sm:pr-6"
        @click="goTo('/dashboard')"
        >Dashboard</DisclosureButton
      >
    </div>
    <div v-if="isAuth" class="border-t border-gray-200 pb-3 pt-4">
      <div class="flex items-center px-4 sm:px-6">
        <div class="flex-shrink-0">
          <img class="h-10 w-10 rounded-full" :src="user.picture" alt="" />
        </div>
        <div class="ml-3">
          <div class="text-base font-medium text-gray-800">
            {{ user.nickname }}
          </div>
          <div class="text-sm font-medium text-gray-500">{{ user.email }}</div>
        </div>
        <button
          type="button"
          class="ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <span class="sr-only">View notifications</span>
          <BellIcon class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <div class="mt-3 space-y-1">
        <DisclosureButton
          as="a"
          href="#"
          class="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 sm:px-6"
          @click="goTo('/account')"
          >Settings</DisclosureButton
        >
        <DisclosureButton
          as="a"
          href="#"
          class="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 sm:px-6"
          @click="onLogout"
          >Sign out</DisclosureButton
        >
      </div>
    </div>
  </DisclosurePanel>
</template>

<script lang="ts" setup>
import { useAuth0 } from '@auth0/auth0-vue'
import { DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { BellIcon } from '@heroicons/vue/24/outline'
import { useRouter } from 'vue-router'
const { user, logout } = useAuth0()
const router = useRouter()
const isAuth = useAuth0().isAuthenticated
const goTo = (link: string) => {
  router.push(link)
}
const onLogout = () => {
  logout({ logoutParams: { returnTo: window.location.origin } })
}
</script>

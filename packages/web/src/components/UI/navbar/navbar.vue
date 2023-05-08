<template>
  <Disclosure as="nav" class="bg-white shadow mb-1" v-slot="{ open }">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 justify-between">
        <div class="flex w-full md:w-auto">
          <div class="-ml-2 mr-2 flex items-center md:hidden">
            <!-- Mobile menu button -->
            <MobileButton :open="open" />
          </div>
          <div
            class="cursor-pointer flex flex-shrink-0 items-center order-1"
            @click="goTo('/')"
          >
            <img
              class="block h-20 w-auto lg:hidden"
              src="https://res.cloudinary.com/dxuf2ssx6/image/upload/v1682296708/practiceMed/Illustrations/Practice_Med-logo.png"
              alt="Practice Med"
            />
            <img
              class="hidden h-20 w-auto lg:block"
              src="https://res.cloudinary.com/dxuf2ssx6/image/upload/v1682296708/practiceMed/Illustrations/Practice_Med-logo.png"
              alt="Practice Med"
            />
          </div>
          <div
            class="md:ml-6 flex grow md:grow-0 space-x-2 md:space-x-8 gap-2 md:gap-0 md:order-1"
          >
            <!-- Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" -->
            <RouterLink
              v-if="isAuth"
              active-class="border-indigo-500 border-b-2"
              to="/dashboard"
              class="hidden md:inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
              >Dashboard</RouterLink
            >
            <RouterLink
              active-class="border-indigo-500 border-b-2"
              to="/plans"
              class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
              >Plans</RouterLink
            >
            <RouterLink
              active-class="border-indigo-500 border-b-2"
              to="/dashboard"
              class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
              >Tests</RouterLink
            >
            <!-- <RouterLink
              active-class="border-indigo-500 border-b-2"
              to="/dashboard"
              class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
              >Resources</RouterLink
            > -->
          </div>
        </div>
        <div class="hidden md:flex items-center">
          <div class="flex-shrink-0">
            <RouterLink
              v-if="!hideTrialButton"
              as="button"
              to="/plans"
              class="hidden relative sm:inline-flex items-center gap-x-1.5 rounded-md bg-green-600 px-3 py-2 mr-6 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              Start Free Trial
            </RouterLink>
            <button
              v-if="!isAuth"
              @click="
                () =>
                  loginWithRedirect({
                    authorizationParams: { screen_hint: 'signup' }
                  })
              "
              type="button"
              class="relative inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 mr-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign Up
            </button>
          </div>
          <div class="flex-shrink-0">
            <button
              v-if="!isAuth"
              @click="() => loginWithRedirect()"
              type="button"
              class="relative inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 mr-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Log In
            </button>
          </div>
          <!-- <div v-if="isAuth" class="flex-shrink-0">
            <button
              type="button"
              class="relative inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <PlusIcon class="-ml-0.5 h-5 w-5" aria-hidden="true" />
              New Test
            </button>
          </div> -->
          <div
            v-if="isAuth"
            class="hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center"
          >
            <button
              type="button"
              class="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span class="sr-only">View notifications</span>
              <BellIcon class="h-6 w-6" aria-hidden="true" />
            </button>

            <!-- Profile dropdown -->

            <ProfileDropdown v-if="isAuth" />
          </div>
        </div>
      </div>
    </div>

    <DsiclosurePanel />
  </Disclosure>
</template>

<script lang="ts" setup>
import { Disclosure } from '@headlessui/vue'
import { BellIcon } from '@heroicons/vue/24/outline'
import MobileButton from './components/MobileButton.vue'
import ProfileDropdown from './components/ProfileDropdown.vue'
import DsiclosurePanel from './components/DisclosurePanel.vue'
import { useAuth0 } from '@auth0/auth0-vue'
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/store/main'
import { usePlansStore } from '@/store/plans'

const store = useAppStore()
const plansStore = usePlansStore()

const { isAuth } = storeToRefs(store)

const { loginWithRedirect } = useAuth0()
const router = useRouter()
const route = useRoute()

const hideTrialButton = computed(
  () => plansStore.hasActivePlan == true || route.fullPath == '/plans'
)

const goTo = (link: string) => {
  router.push(link)
}
</script>

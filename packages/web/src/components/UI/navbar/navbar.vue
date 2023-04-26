<!-- <template>
  <div>
    <v-app-bar color="deep-purple" dark>
      <template v-slot:prepend>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      </template>
      <v-toolbar-title class="font-weight-bold">MLE Prep Tests</v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title
              ><v-list-item-title @click="goTo('/')"
                >Home</v-list-item-title
              ></v-list-item-title
            >
          </v-list-item>

          <v-list-item v-if="isAuthenticated">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title
              ><v-list-item-title @click="goTo('/account')"
                >Account</v-list-item-title
              ></v-list-item-title
            >
          </v-list-item>

          <v-list-item v-if="isAuthenticated">
            <v-list-item-icon>
              <v-icon>mdi-view-dashboard</v-icon>
            </v-list-item-icon>
            <v-list-item-title
              ><v-list-item-title @click="goTo('/dashboard')"
                >Dashboard</v-list-item-title
              ></v-list-item-title
            >
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-test-tube</v-icon>
            </v-list-item-icon>
            <v-list-item-title
              ><v-list-item-title @click="goTo('/tests')"
                >Tests</v-list-item-title
              ></v-list-item-title
            >
          </v-list-item>

          <v-list-item v-if="!isAuthenticated">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title @click="login">Log In</v-list-item-title>
          </v-list-item>

          <v-list-item v-if="isAuthenticated">
            <v-list-item-icon>
              <v-icon>mdi-logout-variant</v-icon>
            </v-list-item-icon>
            <v-list-item-title @click="logout">Log Out</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
export default {
  data: () => ({
    drawer: false,
    group: 'first'
  }),
  computed: {
    isAuthenticated() {
      return this.$auth.isAuthenticated
      return false
    }
  },
  methods: {
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin
      })
    },
    login() {
      this.$auth.loginWithRedirect()
    },
    goTo(link: string) {
      this.$router.push(link)
    }
  }
}
</script> -->

<template>
  <Disclosure as="nav" class="bg-white shadow mb-1" v-slot="{ open }">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 justify-between">
        <div class="flex">
          <div v-if="isAuth" class="-ml-2 mr-2 flex items-center md:hidden">
            <!-- Mobile menu button -->
            <MobileButton :open="open" />
          </div>
          <div class="flex flex-shrink-0 items-center" @click="goTo('/')">
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
          <div v-if="isAuth" class="hidden md:ml-6 md:flex md:space-x-8">
            <!-- Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" -->
            <a
              href="#"
              class="inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900"
              @click="goTo('/dashboard')"
              >Dashboard</a
            >
          </div>
        </div>
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <button
              v-if="!isAuth"
              @click="login"
              type="button"
              class="relative inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 mr-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <PlusIcon class="-ml-0.5 h-5 w-5" aria-hidden="true" />
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

            <ProfileDropdown />
          </div>
        </div>
      </div>
    </div>

    <DsiclosurePanel v-if="isAuth" />
  </Disclosure>
</template>

<script lang="ts">
import { Disclosure } from '@headlessui/vue'
import { BellIcon } from '@heroicons/vue/24/outline'
import { PlusIcon } from '@heroicons/vue/20/solid'
import MobileButton from './components/MobileButton.vue'
import ProfileDropdown from './components/ProfileDropdown.vue'
import DsiclosurePanel from './components/DisclosurePanel.vue'
export default {
  data() {
    return {
      isAuth: this.$auth0.isAuthenticated
    }
  },
  methods: {
    login() {
      this.$auth0.loginWithRedirect()
    },
    goTo(link: string) {
      this.$router.push(link)
    }
  },
  components: {
    Disclosure,
    DsiclosurePanel,
    MobileButton,
    PlusIcon,
    BellIcon,
    ProfileDropdown
  }
}
</script>

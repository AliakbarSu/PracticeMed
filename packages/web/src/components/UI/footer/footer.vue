<template>
  <footer aria-labelledby="footer-heading" class="bg-gray-50">
    <h2 id="footer-heading" class="sr-only">Footer</h2>
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="border-t border-gray-200 py-20">
        <div
          class="grid grid-cols-1 md:grid-flow-col md:auto-rows-min md:grid-cols-12 md:gap-x-8 md:gap-y-16"
        >
          <!-- Image section -->
          <div class="col-span-1 md:col-span-2 lg:col-start-1 lg:row-start-1">
            <img
              src="https://res.cloudinary.com/dxuf2ssx6/image/upload/v1682296708/practiceMed/Illustrations/Practice_Med-logo.png"
              alt="Practice Med logo"
              class="h-20 w-auto"
            />
          </div>

          <!-- Sitemap sections -->
          <div
            class="col-span-6 mt-10 grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-8 md:col-start-3 md:row-start-1 md:mt-0 lg:col-span-6 lg:col-start-2"
          >
            <div
              class="grid grid-cols-1 gap-y-12 sm:col-span-2 sm:grid-cols-2 sm:gap-x-8"
            >
              <div>
                <h3 class="text-sm font-medium text-gray-900">Programmes</h3>
                <ul role="list" class="mt-6 space-y-6">
                  <li
                    v-for="item in footerNavigation.products"
                    :key="item.name"
                    class="text-sm"
                  >
                    <RouterLink
                      :to="item.href"
                      class="text-gray-500 hover:text-gray-600"
                      >{{ item.name }}</RouterLink
                    >
                  </li>
                </ul>
              </div>
              <div>
                <h3 class="text-sm font-medium text-gray-900">Company</h3>
                <ul role="list" class="mt-6 space-y-6">
                  <li
                    v-for="item in footerNavigation.company"
                    :key="item.name"
                    class="text-sm"
                  >
                    <RouterLink
                      active-class="border-b-2 border-indigo-500"
                      :to="item.href"
                      class="text-gray-500 hover:text-gray-600"
                      >{{ item.name }}</RouterLink
                    >
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <h3 class="text-sm font-medium text-gray-900">
                Customer Service
              </h3>
              <ul role="list" class="mt-6 space-y-6">
                <li
                  v-for="item in footerNavigation.customerService"
                  :key="item.name"
                  class="text-sm"
                >
                  <RouterLink
                    active-class="border-b-2 border-indigo-500"
                    :to="item.href"
                    class="text-gray-500 hover:text-gray-600"
                    >{{ item.name }}</RouterLink
                  >
                </li>
              </ul>
            </div>
          </div>

          <!-- Newsletter section -->
          <div
            class="mt-12 md:col-span-8 md:col-start-3 md:row-start-2 md:mt-0 lg:col-span-4 lg:col-start-9 lg:row-start-1"
          >
            <h3 class="text-sm font-medium text-gray-900">
              Sign up for our newsletter
            </h3>
            <p class="mt-6 text-sm text-gray-500">
              Stay Ahead with Our Newsletter - Get Expert Tips, Exclusive
              Discounts, and More!
            </p>
            <form @submit="signup" class="mt-2 flex sm:max-w-md">
              <label for="email-address" class="sr-only">Email address</label>
              <input
                v-model="email"
                id="email-address"
                type="text"
                autocomplete="email"
                required
                class="w-full min-w-0 appearance-none rounded-md border border-gray-300 bg-white px-4 py-2 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              <div class="ml-4 flex-shrink-0">
                <button
                  type="submit"
                  class="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <div role="status" class="flex justify-center" v-if="loading">
                    <svg
                      aria-hidden="true"
                      class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span class="sr-only">Loading...</span>
                  </div>
                  <span v-else>{{ signedUp ? 'Done' : 'Sign up' }}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div class="border-t border-gray-100 py-10 text-center">
        <p class="text-sm text-gray-500">
          &copy; {{ new Date().getFullYear() }} Practice Med LTD. All rights
          reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import axios from 'axios'

export default {
  data() {
    return {
      footerNavigation: items,
      email: '',
      loading: false,
      signedUp: false
    }
  },
  methods: {
    goTo(link: string) {
      this.$router.push(link)
    },
    async signup(event: Event) {
      event.preventDefault()
      if (this.signedUp) return
      try {
        this.loading = true
        await axios.post(
          `${import.meta.env.VITE_API_ENDPOINT}/newsletter/signup`,
          {
            email: this.email
          }
        )
        this.signedUp = true
      } finally {
        this.loading = false
      }
    }
  }
}
const items = {
  products: [
    { name: 'MCAT', href: '/dashboard?test=mcat' },
    { name: 'USMLE', href: '/dashboard?test=usmle' },
    { name: 'AMC', href: '/dashboard?test=amc' }
  ],
  company: [
    { name: 'Who We Are', href: '/about' },
    { name: 'Terms & Conditions', href: '/terms-and-conditions' },
    { name: 'Privacy', href: '/privacy' }
  ],
  customerService: [
    { name: 'Contact', href: '/contact' },
    { name: 'Secure Payments', href: '/secure-payments' },
    { name: 'FAQ', href: '/faqs' }
  ]
}
</script>

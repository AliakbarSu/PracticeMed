<template>
  <div class="relative overflow-hidden">
    <div
      class="bg-white pt-10 pb-14 sm:pt-16 lg:overflow-hidden lg:pt-24 lg:pb-24"
    >
      <div class="mx-auto max-w-5xl lg:px-8">
        <div class="lg:grid lg:gap-8">
          <div
            class="mx-auto max-w-md px-4 text-center sm:max-w-2xl sm:px-6 lg:flex lg:items-center lg:px-0 lg:text-left"
          >
            <div class="lg:py-24">
              <h1
                class="mt-4 text-4xl font-bold tracking-tight text-black sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl"
              >
                <span class="block text-indigo-500">Introducing </span
                ><span class="block text-black">Audio based MCQs</span>
              </h1>
              <p
                class="mt-3 text-base text-gray-400 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl"
                v-if="!contactStore.signedup"
              >
                Our audio based MCQs will launch soon. Join the newsletter to be
                notified when they are available.
              </p>
              <p
                class="mt-3 text-base text-gray-400 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl"
                v-if="contactStore.signedup"
              >
                Thanks for signing up to our newsletter, we will let you know
                when our audio based MCQs are available.
              </p>
              <div class="mt-10 sm:mt-12" v-if="!contactStore.signedup">
                <!-- This is a working waitlist form. Create your access key from https://web3forms.com/s to setup.  -->
                <form
                  @subject="(e) => e.preventDefault()"
                  class="sm:mx-auto sm:max-w-xl lg:mx-0"
                >
                  <div class="sm:flex">
                    <div class="min-w-0 flex-1">
                      <label for="email" class="sr-only">Email address</label
                      ><input
                        v-model="email"
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        class="block w-full rounded-md border-0 bg-gray-200 px-4 py-3 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        autocomplete="off"
                      />
                    </div>
                    <div class="mt-3 sm:mt-0 sm:ml-3">
                      <button
                        :disabled="contactStore.loading"
                        @click="signup"
                        type="button"
                        class="block w-full rounded-md bg-indigo-500 py-3 px-4 font-medium text-white shadow hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 focus:ring-offset-gray-900"
                      >
                        Join
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <!-- <div class="mt-12 hidden lg:block">
            <img
              class=""
              src="https://user-images.githubusercontent.com/1884712/202186141-9f8a93e1-7743-459a-bc95-b1d826931624.png"
              alt=""
            />
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useContactStore } from '../../../src/store/contact'
import { ref } from 'vue'

const email = ref(null)

const contactStore = useContactStore()

const signup = async () => {
  await contactStore.signup({ email: email.value })
  email.value = null
}
</script>

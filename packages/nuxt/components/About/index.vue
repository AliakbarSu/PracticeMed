<template>
  <div class="relative bg-white">
    <div class="mx-auto max-w-7xl lg:flex lg:justify-center lg:px-8">
      <div class="px-6 lg:contents">
        <div
          class="mx-auto max-w-2xl pb-24 pt-16 sm:pb-32 sm:pt-20 lg:ml-10 lg:mr-0 lg:w-full lg:flex-none lg:pt-32"
        >
          <p class="text-base font-semibold leading-7 text-indigo-600">
            {{ about.heading }}
          </p>
          <div v-html="about.content"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  CloudArrowUpIcon,
  LockClosedIcon,
  ServerIcon
} from '@heroicons/vue/20/solid'
import { request } from 'graphql-request'
import { defineComponent } from 'vue'
import gql from 'graphql-tag'

export const getAbout = gql`
  query AboutPage {
    about(where: { id: "clgpviive52f30b1geewv9m08" }) {
      heading
      content
    }
  }
`
export default defineComponent({
  data() {
    return {
      about: {
        heading: '',
        content: ''
      }
    }
  },
  async created() {
    const getAboutPageContent = async () => {
      const config = useRuntimeConfig()
      const data = request(
        config.public.hygraph_endpoint,
        getAbout
      ) as Promise<{
        about: { heading: string; content: string }
      }>
      return (await data).about
    }
    this.about = await getAboutPageContent()
  },
  components: {
    CloudArrowUpIcon,
    LockClosedIcon,
    ServerIcon
  }
})
</script>

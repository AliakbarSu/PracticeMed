<template>
  <div class="mx-auto max-w-7xl sm:px-6 lg:px-8 pb-48 pt-22">
    <div class="px-10 sm:px-6 lg:px-38 xl:px-40 py-32">
      <div class="rounded-md bg-red-50 p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <XCircleIcon class="h-5 w-5 text-red-400" aria-hidden="true" />
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">
              There was something wrong with your payment
            </h3>
            <div class="mt-2 text-sm text-red-700">
              <ul role="list" class="list-disc space-y-1 pl-5">
                <li>Sorry we couldn't process your payment!</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { XCircleIcon } from '@heroicons/vue/20/solid'

export default {
  beforeCreate() {
    const queryParamValue = this.$route.query.canceled
    if (queryParamValue === 'true') {
      this.$router.push('/plans')
    }
  },
  components: {
    XCircleIcon
  }
}
</script>

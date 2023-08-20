<template>
  <div class="bg-white">
    <div class="mx-auto px-6 py-16 sm:py-16 lg:px-8 lg:py-16">
      <div class="mx-auto divide-y divide-gray-900/10">
        <dl class="space-y-6 divide-y divide-gray-900/10">
          <Disclosure as="div" class="pt-6" v-slot="{ open }">
            <dt>
              <DisclosureButton
                class="flex w-full items-start justify-between text-left text-gray-900"
              >
                <span class="text-base font-semibold leading-7"
                  >Explanation</span
                >
                <span class="ml-6 flex h-7 items-center">
                  <PlusSmallIcon
                    v-if="!open"
                    class="h-6 w-6"
                    aria-hidden="true"
                  />
                  <MinusSmallIcon v-else class="h-6 w-6" aria-hidden="true" />
                </span>
              </DisclosureButton>
            </dt>
            <DisclosurePanel as="dd" class="pr-12">
              <p class="text-sm leading-7 text-gray-600" v-html="text"></p>
            </DisclosurePanel>
          </Disclosure>
        </dl>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/vue/24/outline'
const { text } = defineProps({ text: String })
</script>

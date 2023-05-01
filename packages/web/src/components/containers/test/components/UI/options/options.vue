<template>
  <RadioGroup v-model="selected" class="px-6 lg:px-8">
    <RadioGroupLabel class="sr-only"> Server size </RadioGroupLabel>
    <div class="space-y-4">
      <RadioGroupOption
        as="template"
        v-for="option in options"
        :key="option.id"
        :value="option.id"
        v-slot="{ checked, active }"
      >
        <div
          @click="select(option)"
          :class="[
            checked ? 'border-transparent' : 'border-gray-300',
            active ? 'border-indigo-600 ring-2 ring-indigo-600' : '',
            'relative block cursor-pointer rounded-lg border bg-white px-6 py-4 shadow-sm focus:outline-none sm:flex sm:justify-between'
          ]"
        >
          <span class="flex items-center">
            <span class="flex text-sm">
              <RadioGroupLabel as="span" class="font-large text-gray-900 mr-3"
                >{{ option.alpha.toUpperCase() }}
              </RadioGroupLabel>
              <RadioGroupDescription as="span" class="text-gray-500">
                <span class="block sm:inline">{{ option.text }}</span>
              </RadioGroupDescription>
            </span>
          </span>
          <span
            :class="[
              active ? 'border' : 'border-2',
              checked ? 'border-indigo-600' : 'border-transparent',
              'pointer-events-none absolute -inset-px rounded-lg'
            ]"
            aria-hidden="true"
          />
        </div>
      </RadioGroupOption>
    </div>
  </RadioGroup>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import type { Option } from '@/types/question'

import {
  RadioGroup,
  RadioGroupDescription,
  RadioGroupLabel,
  RadioGroupOption
} from '@headlessui/vue'

export default {
  components: {
    RadioGroup,
    RadioGroupDescription,
    RadioGroupLabel,
    RadioGroupOption
  },
  props: {
    options: {
      type: Object as PropType<Option[]>
    }
  },
  data() {
    return {
      settings: [],
      selected: ''
    }
  },
  watch: {
    options: {
      handler() {
        this.selected = ''
      },
      immediate: true
    }
  },
  methods: {
    select(option: Option) {
      this.$emit('select', option)
    }
  }
}
</script>

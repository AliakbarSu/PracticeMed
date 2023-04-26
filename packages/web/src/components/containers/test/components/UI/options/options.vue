<!-- <template>
  <v-list flat subheader three-line class="elevation-2 rounded-lg my-3">
    <v-subheader>Options</v-subheader>

    <v-list-item-group v-model="settings" multiple active-class="">
      <v-list-item
        v-for="option in updatedOptions"
        @click="select(option)"
        :key="option.id"
      >
        <template>
          <v-chip class="ma-2" :color="isActive(option.id) ? 'green' : ''">{{
            option.alpha
          }}</v-chip>
          <v-list-item-content>
            <v-list-item-title class="text-wrap">{{
              option.text
            }}</v-list-item-title>
          </v-list-item-content>
        </template>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script lang="ts">
import type { PropType } from 'vue'

interface Option {
  id: string
  text: string
}
export default {
  props: {
    options: {
      type: Object as PropType<Option[]>
    }
  },
  data() {
    return {
      settings: [],
      alphabets: 'a,b,c,d,e,f,g',
      activeItem: ''
    }
  },
  computed: {
    updatedOptions() {
      return this.options?.map((op, index) => {
        return {
          ...op,
          alpha: this.alphabets.split(',')[index].toUpperCase()
        }
      })
    }
  },
  methods: {
    isActive(item: string) {
      return item.toLowerCase() === this.activeItem.toLowerCase()
    },
    select(option: Option) {
      this.activeItem = option.id
      this.$emit('select', option)
    }
  }
}
</script> -->

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
            <span class="flex flex-col text-sm">
              <RadioGroupLabel as="span" class="font-medium text-gray-900">{{
                option.alpha
              }}</RadioGroupLabel>
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

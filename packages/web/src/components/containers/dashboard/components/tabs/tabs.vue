<template>
  <v-card class="ma-4 mt-10 large-height">
    <v-tabs color="deep-purple accent-2" right>
      <v-tab @click="tabClicked('bookedTests')">Booked Tests</v-tab>
      <v-tab @click="tabClicked('testHistory')">Tests Taken</v-tab>
      <slot />
    </v-tabs>
  </v-card>
</template>

<script lang="ts">
export default {
  data() {
    return {
      tab: null,
      items: ['web', 'shopping', 'videos', 'images', 'news'],
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
  },
  methods: {
    tabClicked(clickedItem: string) {
      this.$emit('tabClicked', clickedItem)
    }
  }
}
</script>

<style scoped>
.large-height {
  height: 80%;
}
</style>

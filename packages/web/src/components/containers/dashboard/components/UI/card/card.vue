<template>
  <v-card max-width="344" class="text-left">
    <v-img :src="productDetails.images[0]" height="200px"></v-img>
    <v-card-text>
      <div>Test Type</div>
      <p class="text-h4 text--primary">
        {{ productDetails.name }}
      </p>
      <div class="d-flex justify-space-between">
        <p>{{ duration }}</p>
      </div>
      <div class="text--primary">
        {{ productDetails.description }}
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn color="deep-purple accent-4" text @click="takeTest">
        Take Test
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
export default {
  props: ['productDetails', 'duration'],
  methods: {
    takeTest() {
      this.$emit('takeTest')
    }
  }
}
</script>

<style></style>

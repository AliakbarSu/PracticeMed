<template>
  <v-container class="fill-height">
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="10">
          <v-alert outlined type="success"  class="py-5">
            Thank you your payment was successful, we are in the process of
            booking your test.
          </v-alert>
        </v-col>
        <v-col cols="10" class="d-flex justify-center">
          <v-btn class="my-2 mx-auto" color="success" @click="goToDashboard">
            View Your Tests
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script lang="ts">

export default {
  methods: {
    goToDashboard() {
      this.$router.push('/dashboard')
    }
  }
}
</script>

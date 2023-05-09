<template>
  <v-container class="fill-height">
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="10">
          <v-alert outlined type="error" class="py-5">
            Sorry there was a problem processing your payment card. Please try
            to book your test again by going to the booking page.
          </v-alert>
        </v-col>
        <v-col cols="10" class="d-flex justify-center">
          <v-btn class="my-2 mx-auto" color="secondary" @click="goToBookTest">
            Book again
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script lang="ts">
export default {
  methods: {
    goToBookTest() {
      this.$router.push('/tests')
    }
  }
}
</script>

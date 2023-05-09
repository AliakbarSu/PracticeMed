<template>
  <v-container fluid>
    <v-container class="mt-6" fluid>
      <v-alert border="top" colored-border type="info" elevation="2">
        At the moment we only have the AMC practice tests available, however, we
        are working hard to bring in other standards as well.
      </v-alert>
    </v-container>
    <v-container class="my-6" fluid>
      <v-row>
        <v-col
          align="center"
          cols="12"
          sm="12"
          md="4"
          lg="4"
          xl="3"
          v-for="product in products"
          :key="product.id"
        >
          <Card
            @takeTest="goToCheckout(product.id)"
            text="Book Test"
            :duration="product.metadata.duration"
            :productDetails="product"
            :price="product.metadata.price"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script lang="ts">
import Card from './components/UI/card/card.vue'
export default {
  methods: {
    goToCheckout(testId: string) {
      if (!this.isAuthenticated) {
        this.$auth.loginWithRedirect()
        return
      }
      this.$store
        .dispatch('bookTest', {
          productId: testId,
          userId: this.$auth.user.sub,
          userEmail: this.$auth.user.email
        })
        .then((url) => {
          if (url) {
            window.location.href = url
          } else {
            alert('Something went wrong try again!')
          }
        })
    }
  },
  components: {
    Card
  },
  computed: {
    products() {
      return this.$store.getters.getProducts
      // return []
    },
    isAuthenticated() {
      // return this.$store.getters.isAuthenticated
      return true
    }
  },
  created() {
    this.$store.dispatch('fetchProducts')
  }
}
</script>

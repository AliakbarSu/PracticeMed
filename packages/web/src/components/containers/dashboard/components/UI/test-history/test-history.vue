<template>
  <div>
    <!-- <v-alert v-if="!isAnyHistory" dense type="info" class="mt-3"> -->
    <v-alert  dense type="info" class="mt-3">
      You have not taken any test yet
    </v-alert>
    <v-timeline >
      <v-timeline-item
        v-for="test in history"
        :key="test.results.timestamps"
        color="red lighten-2"
        large
      >
        <!-- <template v-slot:opposite>
          <span>{{ displayCorrectDate(test.results.timestamps) }}</span>
        </template> -->
        <!-- <v-hover v-slot="{ hover }"> -->
          <v-card
            @click="showTestResults(test.results)"
            class="elevation-2"
            :elevation="2"
            :class="{ 'on-hover': true }"
          >
            <v-card-title class="text-h5">{{ test.name }}</v-card-title>
            <v-card-text>
              {{ test.description }}
            </v-card-text>
          </v-card>
        <!-- </v-hover> -->
      </v-timeline-item>
    </v-timeline>
  </div>
</template>

<script lang="ts">
import moment from 'moment'
export default {
  props: ['history'],
  created() {
    // console.log(this.history)
  },
  computed: {
    isAnyHistory() {
      return this.history.length > 0
    }
  },
  methods: {
    displayCorrectDate(dateToParse: string) {
      // const date = new Date(dateToParse)
      // return moment(date).format('Do MMMM YYYY, h:mm a')
      return "fjsfjsf"
    },
    showTestResults(results: string) {
      this.$store.commit('setTestResult', results)
      this.$router.push('/test-results')
    }
  }
}
</script>
<style scoped>
.v-card .on-hover {
  opacity: 0.7;
  cursor: pointer;
}
</style>

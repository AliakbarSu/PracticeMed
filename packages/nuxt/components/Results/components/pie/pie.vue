<template>
  <apexchart
    type="pie"
    width="380"
    :options="chartOptions"
    :series="chartData"
  ></apexchart>
</template>

<script lang="ts">
export default {
  props: ['data', 'labels', 'options'],
  computed: {
    chartOptions() {
      return {
        ...this.options,
        chart: {
          width: 380,
          type: 'pie'
        },
        labels: this.labels,
        responsive: [
          // {
          //   breakpoint: 480,
          //   options: {
          //     chart: {
          //       width: 200
          //     },
          //     legend: {
          //       position: 'bottom'
          //     }
          //   }
          // }
        ]
      }
    },
    chartData() {
      return this.data
    }
  }
}
</script>

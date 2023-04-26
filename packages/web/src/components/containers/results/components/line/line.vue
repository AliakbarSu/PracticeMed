<template>
  <apexchart
    type="line"
    height="350"
    :options="chartOptions"
    :series="chartData"
  ></apexchart>
</template>

<script lang="ts">

export default {
  props: ['labels', 'data'],
  computed: {
    chartOptions() {
      return {
        chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        legend: {
          tooltipHoverFormatter: function (val: string, opts: {seriesIndex: number; dataPointIndex: number; w: {globals: any}}) {
            return (
              val +
              ' - <strong>' +
              opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
              '</strong>'
            )
          }
        },
        markers: {
          size: 0,
          hover: {
            sizeOffset: 6
          }
        },
        xaxis: {
          categories: this.labels
        },
        grid: {
          borderColor: '#f1f1f1'
        }
      }
    },
    chartData() {
      return [
        {
          name: 'Time Performance',
          data: this.data
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped></style>

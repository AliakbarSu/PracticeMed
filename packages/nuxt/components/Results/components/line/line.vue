<template>
  <apexchart
    type="line"
    height="350"
    style="margin-bottom: 20px"
    :options="chartOptions"
    :series="chartData"
  ></apexchart>
</template>

<script lang="ts">
export default {
  props: {
    labels: {
      type: Array,
      required: true
    },
    data: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      required: true,
      default: 'Time Spent'
    }
  },
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
          tooltipHoverFormatter: function (
            val: string,
            opts: {
              seriesIndex: number
              dataPointIndex: number
              w: { globals: any }
            }
          ) {
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
          categories: this.labels,
          title: {
            text: 'Test Duration'
          }
        },
        yaxis: {
          title: {
            text: this.title
          }
        },
        grid: {
          borderColor: '#f1f1f1'
        }
      }
    },
    chartData() {
      return [
        {
          name: this.title,
          data: this.data,
          color: 'green'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped></style>

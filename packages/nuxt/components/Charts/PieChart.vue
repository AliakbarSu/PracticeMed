<template>
  <div class="mpt-pie-chart" ref="chartRef" />
</template>

<script lang="ts" setup>
import * as am5 from '@amcharts/amcharts5'
import * as am5percent from '@amcharts/amcharts5/percent'
import { ref, onMounted, onUnmounted } from 'vue'

const rootRef = ref<am5.Root | null>(null)
const chartRef = ref(null)

const props = defineProps<{
  data: {
    category: string
    value: number
  }[]
  tooltipUnit: string
}>()

onMounted(() => {
  if (!chartRef.value) return
  const root = am5.Root.new(chartRef.value)

  const chart = root.container.children.push(
    am5percent.PieChart.new(root, {
      layout: root.verticalLayout,
      radius: am5.percent(80),
      width: am5.percent(100),
      height: am5.percent(100),
      innerRadius: am5.percent(50)
    })
  )

  const series = chart.series.push(
    am5percent.PieSeries.new(root, {
      valueField: 'value',
      categoryField: 'category',
      alignLabels: false,
      tooltip: am5.Tooltip.new(root, {
        dy: -25,
        labelText: `{value} ${props.tooltipUnit}`
      })
    })
  )

  series.labels.template.setAll({
    textType: 'circular',
    centerX: 0,
    centerY: 0,
    text: '{category}',
    fontSize: 10
  })

  series.data.setAll(props.data)

  // const legend = chart.children.push(
  //   am5.Legend.new(root, {
  //     centerX: am5.percent(50),
  //     x: am5.percent(50),
  //     marginTop: 15,
  //     marginBottom: 15
  //   })
  // )

  // legend.data.setAll(series.dataItems)
  rootRef.value = root
})

onUnmounted(() => {
  if (rootRef.value) {
    rootRef.value.dispose()
  }
})
</script>

<style scoped>
.mpt-pie-chart {
  width: 100%;
  margin: auto;
  height: 400px;
}
</style>

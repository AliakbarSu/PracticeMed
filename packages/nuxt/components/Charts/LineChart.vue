<template>
  <div class="mpt-line-chart" ref="chartRef" />
</template>

<script lang="ts" setup>
import * as am5 from '@amcharts/amcharts5'
import * as am5xy from '@amcharts/amcharts5/xy'
import { ref, onMounted, onUnmounted } from 'vue'

const rootRef = ref<am5.Root | null>(null)
const chartRef = ref(null)
const seriesRef = ref<am5.Series | null>(null)

const props = defineProps<{ data: { score: number; value: number }[] }>()

onMounted(() => {
  if (!chartRef.value) return
  const root = am5.Root.new(chartRef.value)
  root.durationFormatter.set('durationFormat', 'm:s')

  const chart = root.container.children.push(am5xy.XYChart.new(root, {}))

  const xAxis = chart.xAxes.push(
    am5xy.DurationAxis.new(root, {
      baseUnit: 'minute',
      renderer: am5xy.AxisRendererX.new(root, {})
    })
  )

  const yAxis = chart.yAxes.push(
    am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererY.new(root, {})
    })
  )

  yAxis.axisHeader.set('paddingTop', 10)
  const yLabel = yAxis.axisHeader.children.push(
    am5.Label.new(root, {
      text: 'Score',
      fontWeight: '500',
      y: am5.p50,
      x: am5.p0,
      centerY: am5.p0
    })
  )

  const xAxisRenderer = xAxis.get('renderer')
  xAxisRenderer.labels.template.setAll({
    paddingTop: 15,
    fontWeight: '500'
  })

  const yAxisRenderer = yAxis.get('renderer')
  yAxisRenderer.labels.template.setAll({
    paddingRight: 15,
    fontWeight: '500'
  })

  seriesRef.value = chart.series.push(
    am5xy.LineSeries.new(root, {
      name: 'Series',
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: 'score',
      valueXField: 'value',
      tooltip: am5.Tooltip.new(root, {
        labelText: '{valueY}'
      })
    })
  )
  rootRef.value = root
})

watch([() => props.data, () => seriesRef.value], ([data]) => {
  if (seriesRef.value) {
    seriesRef.value.data.setAll(data)
  }
})

onUnmounted(() => {
  if (rootRef.value) {
    rootRef.value.dispose()
  }
})
</script>

<style scoped>
.mpt-line-chart {
  width: 100%;
  margin: auto;
  height: 200px;
}
</style>

<template>
  <div class="mpt-bar-chart" ref="chartRef" />
</template>

<script lang="ts" setup>
import * as am5 from '@amcharts/amcharts5'
import * as am5xy from '@amcharts/amcharts5/xy'
import { ref, onMounted, onUnmounted } from 'vue'

const rootRef = ref<am5.Root | null>(null)
const chartRef = ref(null)

const props = defineProps<{
  data: {
    category: string
    score: number
  }[]
}>()

onMounted(() => {
  if (!chartRef.value) return
  const root = am5.Root.new(chartRef.value)

  const chart = root.container.children.push(
    am5xy.XYChart.new(root, {
      panX: false,
      panY: false,
      wheelX: 'none',
      wheelY: 'none',
      paddingLeft: 0
    })
  )

  const cursor = chart.set('cursor', am5xy.XYCursor.new(root, {}))
  cursor.lineY.set('visible', false)

  const xRenderer = am5xy.AxisRendererX.new(root, {
    minGridDistance: 30,
    minorGridEnabled: true
  })

  xRenderer.labels.template.setAll({
    rotation: -15,
    fontSize: 10
  })
  const xAxis = chart.xAxes.push(
    am5xy.CategoryAxis.new(root, {
      categoryField: 'category',
      maxDeviation: 0,
      renderer: xRenderer,
      tooltip: am5.Tooltip.new(root, {})
    })
  )

  xRenderer.grid.template.set('visible', false)

  const yRenderer = am5xy.AxisRendererY.new(root, {})
  const yAxis = chart.yAxes.push(
    am5xy.ValueAxis.new(root, {
      maxDeviation: 0,
      min: 0,
      extraMax: 0.1,
      renderer: yRenderer
    })
  )
  yRenderer.grid.template.setAll({
    strokeDasharray: [2, 2]
  })

  var series = chart.series.push(
    am5xy.ColumnSeries.new(root, {
      name: 'Scores',
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: 'score',
      sequencedInterpolation: true,
      categoryXField: 'category',
      tooltip: am5.Tooltip.new(root, { dy: -25, labelText: '{valueY} points' })
    })
  )

  series.columns.template.setAll({
    cornerRadiusTL: 5,
    cornerRadiusTR: 5,
    strokeOpacity: 0
  })

  series.columns.template.adapters.add('fill', (fill, target) => {
    return chart.get('colors')?.getIndex(series.columns.indexOf(target))
  })

  series.columns.template.adapters.add('stroke', (stroke, target) => {
    return chart.get('colors')?.getIndex(series.columns.indexOf(target))
  })

  xAxis.data.setAll(props.data)
  series.data.setAll(props.data)

  rootRef.value = root
})

onUnmounted(() => {
  if (rootRef.value) {
    rootRef.value.dispose()
  }
})
</script>

<style scoped>
.mpt-bar-chart {
  width: 100%;
  margin: auto;
  height: 200px;
}
</style>

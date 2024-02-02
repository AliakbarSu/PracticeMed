<template>
  <div class="mpt-bar-chart" ref="chartRef" />
</template>

<script lang="ts" setup>
import * as am5 from '@amcharts/amcharts5'
import * as am5xy from '@amcharts/amcharts5/xy'
import { ref, onMounted, onUnmounted } from 'vue'

const rootRef = ref<am5.Root | null>(null)
const chartRef = ref<HTMLDivElement | null>(null)
const seriesRef = ref<am5.Series | null>(null)
const xAxisRef = ref<am5xy.CategoryAxis<any> | null>(null)

const props = defineProps({
  tooltipUnit: {
    type: String,
    default: 'points'
  },
  data: {
    type: Array<{ category: string; score: number }>,
    default: () => []
  }
})

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
      tooltip: am5.Tooltip.new(root, {
        dy: -25,
        labelText: `{valueY} ${props.tooltipUnit}`
      })
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
  xAxisRef.value = xAxis
  seriesRef.value = series
  rootRef.value = root
})

watch(
  [() => props.data, () => seriesRef.value, () => xAxisRef.value],
  ([data]) => {
    if (seriesRef.value && xAxisRef.value) {
      xAxisRef.value.data.setAll(data)
      seriesRef.value.data.setAll(data)
    }
  }
)

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
  height: 400px;
}
</style>

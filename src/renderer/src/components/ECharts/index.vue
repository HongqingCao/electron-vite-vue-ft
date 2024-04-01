/*
 * @Description:
 * @Version: 1.0
 * @Autor: codercao
 * @Date: 2024-03-30 22:34:25
 * @LastEditors: codercao
 * @LastEditTime: 2024-04-01 21:46:49
 */

 <template>
  <div class="chart-warpper" id="chartRef"></div>
</template>

<script setup>
import { onMounted, ref, reactive, toRefs, onBeforeUnmount } from 'vue'
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core'
// 引入所需图表，图表后缀都为 Chart
import { BarChart, LineChart, CandlestickChart } from 'echarts/charts'
// 引入组件，组件后缀都为 Component
import {
  GridSimpleComponent,
  GridComponent,
  PolarComponent,
  RadarComponent,
  GeoComponent,
  SingleAxisComponent,
  ParallelComponent,
  CalendarComponent,
  GraphicComponent,
  ToolboxComponent,
  TooltipComponent,
  AxisPointerComponent,
  BrushComponent,
  TitleComponent,
  TimelineComponent,
  MarkPointComponent,
  MarkLineComponent,
  MarkAreaComponent,
  LegendComponent,
  LegendScrollComponent,
  LegendPlainComponent,
  DataZoomComponent,
  DataZoomInsideComponent,
  DataZoomSliderComponent,
  VisualMapComponent,
  VisualMapContinuousComponent,
  VisualMapPiecewiseComponent,
  AriaComponent,
  TransformComponent,
  DatasetComponent
} from 'echarts/components'
// 标签自动布局、全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features'
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers'
let chartInstance = null
//const chartRef = ref(null)
const props = defineProps({
  chartOptions: {
    type: Object,
    default: {}
  }
})

//const { chartOptions } = props
// 注册必须的组件
echarts.use([
  BarChart,
  LineChart,
  CandlestickChart,

  GridSimpleComponent,
  GridComponent,
  PolarComponent,
  RadarComponent,
  GeoComponent,
  SingleAxisComponent,
  ParallelComponent,
  CalendarComponent,
  GraphicComponent,
  ToolboxComponent,
  TooltipComponent,
  AxisPointerComponent,
  BrushComponent,
  TitleComponent,
  TimelineComponent,
  MarkPointComponent,
  MarkLineComponent,
  MarkAreaComponent,
  LegendComponent,
  LegendScrollComponent,
  LegendPlainComponent,
  DataZoomComponent,
  DataZoomInsideComponent,
  DataZoomSliderComponent,
  VisualMapComponent,
  VisualMapContinuousComponent,
  VisualMapPiecewiseComponent,
  AriaComponent,
  TransformComponent,
  DatasetComponent,

  LabelLayout,
  UniversalTransition,
  CanvasRenderer
])

const initChart = () => {
  chartInstance = echarts.init(document.getElementById('chartRef'), 'dark', {
    renderer: 'canvas',
    useDirtyRect: false
  })
console.log("chartOptions",props.chartOptions)
  chartInstance.setOption(props.chartOptions)
}
onMounted(() => {
  initChart()
  window.addEventListener('resize', resizeTheChart, { passive: true })
})

const resizeTheChart = () => {
  if (chartInstance) {
    chartInstance.resize && chartInstance.resize()
  }
}

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeTheChart)
})
</script>


<style>
.chart-warpper {
  width: 100%;
  height: 100%;
}
</style>
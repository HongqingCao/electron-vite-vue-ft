<template>
  <div class="kline-warpper">
    <div class="left-warpper">
      <echarts :chartOptions="chartOptions" v-if="showChart"></echarts>
    </div>

    <div class="right-warpper">
      <div class="title">
        <div>阿里巴巴-SW 09988</div>
      </div>
      <div class="now"><span class="pr">70.350</span> <span>-0.650  -0.92%</span></div>
      <div class="list">
        <div class="list-item"><span>委比：</span><span>95.4%</span></div>
        <div class="list-item"><span>委差：</span><span>95.4%</span></div>
      </div>
      <div class="list">
        <div class="list-item"><span>卖一</span><span>70.44</span></div>
        <div class="list-item"><span></span><span>5200</span></div>
      </div>
      <div class="list list-border-bottom" >
        <div class="list-item"><span>买一</span><span>70.350</span></div>
        <div class="list-item"><span></span><span>22.53万</span></div>
      </div>
      <div class="list">
        <div class="list-item"><span>昨收</span><span>71.00</span></div>
        <div class="list-item"><span>开盘</span><span class="red">71.850</span></div>
      </div>
      <div class="list">
        <div class="list-item"><span>涨跌</span><span class="red">-0.650</span></div>
        <div class="list-item"><span>最高</span><span class="red">70.150</span></div>
      </div>
      <div class="list">
        <div class="list-item"><span>涨幅</span><span class="red">-0.954%</span></div>
        <div class="list-item"><span>最低</span><span class="red">70.130</span></div>
      </div>
      <div class="list">
        <div class="list-item"><span>总量</span><span>4667万</span></div>
        <div class="list-item"><span>金额</span><span>39.95亿</span></div>
      </div>
      <div class="list">
        <div class="list-item"><span>换手</span><span>0.21</span></div>
        <div class="list-item"><span>量比</span><span>0.46</span></div>
      </div>
      <div class="list">
        <div class="list-item"><span>外盘</span><span class="red">2544万</span></div>
        <div class="list-item"><span>内盘</span><span class="red">1389万</span></div>
      </div>
      <div class="list">
        <div class="list-item"><span>总股本</span><span>1223亿</span></div>
        <div class="list-item"><span>流通股</span><span>124亿</span></div>
      </div>
      <div class="list">
        <div class="list-item"><span>总市值</span><span>14333亿</span></div>
        <div class="list-item"><span>流通值</span><span>14333亿</span></div>
      </div>
      <div class="list list-border-bottom">
        <div class="list-item"><span>TTM市盈</span><span>12.456</span></div>
        <div class="list-item"><span>市净率</span><span>1.389</span></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, nextTick, ref, reactive } from 'vue'
import echarts from '../ECharts/index.vue'
import klineData from './data'
let chartOptions = reactive({})
const showChart = ref(false)
const upColor = '#00da3c'
const downColor = '#ec0000'
const splitData = (rawData) => {
  let categoryData = []
  let values = []
  let volumes = []
  for (let i = 0; i < rawData.length; i++) {
    categoryData.push(rawData[i].splice(0, 1)[0])
    values.push(rawData[i])
    volumes.push([i, rawData[i][4], rawData[i][0] > rawData[i][1] ? 1 : -1])
  }
  return {
    categoryData: categoryData,
    values: values,
    volumes: volumes
  }
}
const calculateMA = (dayCount, data) => {
  var result = []
  for (var i = 0, len = data.values.length; i < len; i++) {
    if (i < dayCount) {
      result.push('-')
      continue
    }
    var sum = 0
    for (var j = 0; j < dayCount; j++) {
      sum += data.values[i - j][1]
    }
    result.push(+(sum / dayCount).toFixed(3))
  }
  return result
}

const getMarkLineData = (dates) => {
  let earliestDates = []

  let currentMonth = -1

  for (let i = 0; i < dates.length; i++) {
    let currentDate = new Date(dates[i])
    let month = currentDate.getMonth()

    if (month !== currentMonth) {
      earliestDates.push(currentDate)
      currentMonth = month
    }
  }

  // 将日期对象转换为字符串格式
  let result = earliestDates.map(function (date) {
    return date.toISOString().slice(0, 10)
  })
  let data = result.map((date) => {
    return {
      xAxis: date,
      name: '分隔线',
      lineStyle: { type: 'solid', color: 'rgba(32, 32, 32, 0.07)' }
    }
  })

  return data
}

const initKOption = (rawData, mycallback) => {
  let data = splitData(rawData)
  let MA5 = calculateMA(5, data)
  let MA10 = calculateMA(10, data)
  let MA20 = calculateMA(20, data)
  let markLineData = getMarkLineData(data.categoryData)
  console.log("data.volumes", data.volumes)
  const axisPointer = {
    show: true,
    lineStyle: {
      type: 'dashed',
      color: 'rgba(32, 32, 32, 0.12)'
    }
  }
  let option = {
    animation: false,
    legend: {
      show: false
    },
    grid: [
      {
        left: '2%',
        right: '2%',
        top: '15px',
        height: '52%'
      },
      {
        left: '2%',
        right: '2%',
        bottom: '20px',
        height: '22%'
      }
    ],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      },
    //  position: ['4%', '60%'],
      // alwaysShowContent: true,
      // extraCssText: 'box-shadow: none',
      // formatter: function (params) {
      //   let obj = {
      //     open_px: '',
      //     close_px: '',
      //     high_px: '',
      //     low_px: '',
      //     business_amount: '',
      //     MA5: '',
      //     MA10: '',
      //     MA20: '',
      //     Volume: ''
      //   }
      //   params.forEach((item) => {
      //     if (item.seriesName == 'candlestick') {
      //       obj.open_px = item.data[1]
      //       obj.close_px = item.data[2]
      //       obj.low_px = item.data[3]
      //       obj.high_px = item.data[4]
      //       obj.business_amount = item.data[5]
      //     }
      //     if (item.seriesName == 'MA5') {
      //       obj.MA5 = item.data
      //     }
      //     if (item.seriesName == 'MA10') {
      //       obj.MA10 = item.data
      //     }
      //     if (item.seriesName == 'MA20') {
      //       obj.MA20 = item.data
      //     }
      //     if (item.seriesName == 'Volume') {
      //       obj.Volume = item.data[1]
      //     }
      //   })
      //   mycallback(obj)
      //   return (
      //     "<div style='height:24px;color: #fff; font-weight: normal;line-height:24px; padding-left:4px;font-size:12px;background:#212529'; display: flex; alignItems: center;'>" +
      //     `<span style=' font-weight: normal;color: #fff; '>VOL成交量:${
      //       obj.Volume / 10000
      //     }万\xa0\xa0</span> ` +
      //     `<span> 开盘价:${obj.open_px} \xa0\xa0 </span> ` +
      //     `<span> 收盘价:${obj.close_px} \xa0\xa0 </span> ` +
      //     `<span> 最高价:${obj.high_px} \xa0\xa0 </span> ` +
      //     `<span> 最低价:${obj.low_px}</span> ` +
      //     '</div>'
      //   )
      // },
      backgroundColor: '#F7F7F7', // 设置为透明背景颜色
      borderColor: 'transparent', // 设置为透明边框颜色
      padding: 0,
      borderWidth: 0,
      textStyle: {
        width: 10000,
        height: 24
      }
    },
    axisPointer: {
      //k线柱状相连
      z: 999999,
      link: {
        xAxisIndex: 'all'
      }
    },
    visualMap: {
      show: false,
      seriesIndex: 5,
      dimension: 2,
      pieces: [
        {
          value: 1,
          color: upColor, // 无背景颜色，使用透明色
          borderColor: upColor
        },
        {
          value: -1,
          color: downColor,
          borderColor: downColor
        }
      ]
    },
    xAxis: [
      {
        show: false,
        type: 'category',
        data: data.categoryData,

        scale: true,
        boundaryGap: false,
        splitLine: {
          show: false
        },
        min: 'dataMin',
        max: 'dataMax',
        axisPointer: {
          label: {
            show: false
          },
          triggerTooltip: true,
          handle: {
            show: false,
            margin: 30,
            color: '#D6D6D6'
          },
          lineStyle: {
            type: 'dashed',
            color: 'rgba(32, 32, 32, 0.12)'
          }
        }
      },
      {
        show: true,
        type: 'category',
        gridIndex: 1,
        data: data.categoryData,
        axisLine: {
          lineStyle: {
            color: '#D6D6D6'
          }
        },
        axisPointer
      }
    ],
    yAxis: [
      {
        position: 'right',
        min: function (value) {
          return Math.round(value.min)
        },
        max: function (value) {
          return Math.round(value.max + 2)
        },
        splitArea: {
          show: false //是否显示分割 灰白背景
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: 'rgba(32, 32, 32, 0.07)'
          }
        },
        axisLine: {
          show: true,
          lineStyle: {
            type: 'solid',
            width: 1,
            color: 'rgba(32, 32, 32, 0.07)'
          }
        },
        axisPointer
      },
      {
        position: 'right',
        scale: true,
        gridIndex: 1,
        splitNumber: 2,
        axisLine: {
          show: true,
          lineStyle: {
            type: 'solid',
            color: 'rgba(32, 32, 32, 0.07)',
            width: 1
          }
        },
        axisLabel: {
          formatter: function (value, index) {
            return value === 0 ? value : value / 10000 + '万'
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisPointer
      }
    ],
    dataZoom: [
      {
        type: 'inside',
        xAxisIndex: [0, 1],
        start: 95,
        end: 100
      }
    ],
    series: [
      {
        name: 'candlestick',
        type: 'candlestick',
        data: data.values,
        emphasis: {
          disabled: true
        },
        itemStyle: {
          color: 'transparent',
          color0: upColor,
          borderColor: downColor,
          borderColor0: undefined
        },
        markLine: {
          symbol: 'none',
          label: { show: false },
          emphasis: {
            lineStyle: {
              type: 'dashed',
              color: '#ccc ',
              width: 1
            }
          },
          data: markLineData
        },
        markPoint: {
          label: {
            formatter: function (param) {
              return param != null ? param.value + '' : ''
            }
          },
          data: [
            {
              name: 'highest value',
              type: 'max',
              valueDim: 'highest'
            },
            {
              name: 'lowest value',
              type: 'min',
              valueDim: 'lowest'
            }
          ]
        }
      },
      {
        name: 'MA5',
        type: 'line',
        data: MA5,
        showSymbol: false,
        symbol: 'none',
        emphasis: {
          disabled: true
        },
        lineStyle: {
          opacity: 0.5,
          width: 1
        }
      },
      {
        name: 'MA10',
        type: 'line',
        data: MA10,
        showSymbol: false,
        symbol: 'none',
        emphasis: {
          disabled: true
        },
        labelLine: {
          lineStyle: {
            width: 1
          }
        },
        lineStyle: {
          opacity: 0.5,
          width: 1
        }
      },
      {
        name: 'MA20',
        type: 'line',
        data: MA20,
        showSymbol: false,
        symbol: 'none',
        emphasis: {
          disabled: true
        },
        lineStyle: {
          opacity: 0.5,
          width: 1
        }
      },
      {
        name: 'MA30',
        type: 'line',
        symbol: 'none',
        emphasis: {
          disabled: true
        },
        data: calculateMA(30, data),
        showSymbol: false,
        lineStyle: {
          opacity: 0.5,
          width: 1
        }
      },
      {
        name: 'Volume',
        type: 'bar',
        xAxisIndex: 1,
        yAxisIndex: 1,
        data: data.volumes,
        barWidth: 'auto',
        itemStyle: {
          borderRadius: 0
        },
        emphasis: {}
      }
    ]
  }
  return option
}
const mycallback = (data) => {
  console.log(data)
}
onMounted(() => {
  chartOptions = initKOption(klineData, mycallback)
  nextTick(() => {
    showChart.value = true
  })
})
</script>

<style lang="scss" scoped>
.kline-warpper {
  width: 100%;
  height: 100%;
  display: flex;

  .left-warpper {
    overflow: hidden;
    flex: 1;
  }
  .right-warpper {
    width: 300px;
    padding: 8px;
    background: #222529;
    color: inherit;
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
    .title {
      font-size: 16px;
    }
    .now {
      color: red;
      padding: 6px 0;
      border-bottom: 1px solid #495057;
      .pr {
        font-size: 14px;
        padding-right: 12px;
      }
    }
    .list{
      display: flex;
      padding: 4px 0;
    
      justify-content: space-between;
      .list-item{
        width: 50%;
        display: flex;
        justify-content: space-between;
        padding-right: 8px;
        .red{
          color: red;
        }
      }
    }
    .list-border-bottom{
      border-bottom: 1px solid #495057;
    }
  }
}
</style>
<!--
 * @Description: 底部内容区域
 * @Version: 1.0
 * @Autor: codercao
 * @Date: 2024-03-10 21:51:03
 * @LastEditors: codercao
 * @LastEditTime: 2024-03-17 13:34:24
-->
<template>
  <div class="foot-warpper">
    <div class="left">
      <div class="left-market" id="footLeft">
        <div class="market-item" v-for="item in marketList" :key="item.code">
          <span>{{ item.name }}</span>
          <span>{{ item.price }}</span>
          <span :class="[item.changeRate > 0 ? 'red' : 'green']">{{ item.changeRate }}%</span>
        </div>
      </div>
    </div>
    <div class="right">
      <el-autocomplete
        size="mini"
        v-model="keyvalue"
        :fetch-suggestions="querySearch"
        clearable
        class="inline-input w-50"
        placeholder="股票/债券/基金"
        @select="handleSelect"
      />
    </div>
  </div>
</template>
<script setup>
import { reactive } from 'vue'

const state = reactive({
  keyvalue: '',
  marketList: [
    {
      code: '000001.SH',
      name: '上证综指',
      price: '3054.64',
      changeRate: '0.54',
      order: 0
    },
    {
      code: '399001.SZ',
      name: '深证成指',
      price: '9612.75',
      changeRate: '0.60',
      order: 1
    },
    {
      code: '899050.BJ',
      name: '北证50',
      price: '892.729',
      changeRate: '3.42',
      order: 2
    },
    {
      code: 'HSI.HI',
      name: '恒生指数',
      price: '16720.89',
      changeRate: '-1.42',
      order: 3
    },
    {
      code: 'DJI.GI',
      name: '道琼斯工业指数',
      price: '38714.77',
      changeRate: '-0.49',
      order: 4
    },
    {
      code: 'IXIC.GI',
      name: '纳斯达克指数',
      price: '15973.17',
      changeRate: '-0.96',
      order: 5
    },
    {
      code: 'SPX.GI',
      name: '标普500',
      price: '5117.09',
      changeRate: '-0.65',
      order: 6
    },
    {
      code: 'GC.CMX',
      name: '黄金',
      price: '2159.4',
      changeRate: '-0.37',
      order: 7
    },
    {
      code: 'B.IPE',
      name: '原油',
      price: '85.35',
      changeRate: '-0.08',
      order: 8
    },
    {
      code: 'EURUSD.FX',
      name: 'EURUSD',
      price: '1.0888',
      changeRate: '0.04',
      order: 9
    },
    {
      code: 'USDCNY.EX',
      name: 'USDCNY',
      price: '7.0975',
      changeRate: '0.00',
      order: 10
    }
  ]
})

let { keyvalue, marketList } = state
const handleSelect = () => {}
const querySearch = () => {}
</script>
<style lang="scss" scoped>
@keyframes myAnimation {
  0% {
    transform: translate(0);
  } /* 初始状态 */
  100% {
    transform: translate(-50%);
  } /* 结束状态 */
}

.foot-warpper {
  height: 40px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: #212529;
  .left {
    height: 40px;
    flex: 1;
    padding: 0 12px;
    display: flex;
    align-items: center;
    font-size: 12px;
    overflow: hidden;
    position: relative;
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 20px;
      height: 100%;
      background-image: linear-gradient(90deg, #212529, rgba(33, 37, 41, 0.15) 70%, transparent);
      z-index: 1;
    }
    &:after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 20px;
      height: 100%;
      background-image: linear-gradient(-90deg, #212529, rgba(33, 37, 41, 0.15) 70%, transparent);
      z-index: 1;
    }
    .left-market {
      display: flex;
      align-items: center;
      white-space: nowrap;
      transform: translate(0);
      animation: myAnimation 50s linear 0s infinite;
      &:hover {
        animation-play-state: paused;
      }
      .market-item {
        width: 200px;
        display: flex;
        align-items: center;
        margin-left: 30px;
        span {
          padding-right: 12px;
        }
        .red {
          color: #fa2832;
        }
        .green {
          color: #16bc50;
        }
      }
    }
  }
  .right {
    display: flex;
    height: 40px;
    align-items: center;
    padding: 0 8px;
    ::v-deep.el-input__inner {
      height: 24px;
    }
  }
}
</style>
<!--
 * @Description: 引导组件
 * @Version: 1.0
 * @Autor: codercao
 * @Date: 2024-03-17 10:36:27
 * @LastEditors: codercao
 * @LastEditTime: 2024-03-17 14:02:54
-->
<template>
  <div class="intro-warpper">
    <canvas ref="maskCanvasRef" class="maskCanvas"></canvas>
    <div
      ref="infoModule"
      class="info-module"
      id="infoModule"
      :style="{ width: active.width + 'px', height: active.height + 'px' }"
    >
      <div class="title">
        <span>{{ active.title }}</span>
        <el-button text size="small" @click="$emit('done')">{{ config.skipLabel }}</el-button>
      </div>
      <div class="content">{{ active.content }}</div>
      <div class="foot">
        <div class="foot-left">{{ index + 1 }}/{{ config.steps.length }}</div>
        <div class="foot-right">
          <el-button
            bg
            text
            size="small"
            v-if="index != 0"
            @click.stop="handleNeLabel(index, 'pre')"
            >{{ config.prevLabel }}</el-button
          >
          <el-button
            type="primary"
            bg
            text
            size="small"
            @click.stop="handleNeLabel(index, 'next')"
            >{{ index + 1 == config.steps.length ? config.doneLabel : config.nextLabel }}</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, nextTick, ref, reactive } from 'vue'
const emit = defineEmits(['done'])
const props = defineProps({
  config: {
    type: Object,
    default() {
      return {
        prevLabel: '上一步',
        nextLabel: '下一步',
        skipLabel: '跳过',
        doneLabel: '完成',
        steps: [
          {
            domId: 'logoid',
            title: 'logo区域',
            content: '这里是展示的系统logo',
            width: 200, //（可选）框选区域自定义宽度，当不指定时，组件自动取目标元素的宽度
            height: 100 //（可选）框选区域自定义高度，当不指定时，组件自动取目标元素的高度
          }
        ]
      }
    }
  }
})

const { config } = props
let index = ref(0)
let active = reactive(config.steps[0])

const maskCanvasRef = ref(null)

// 处理点击上一步和下一步事件
const handleNeLabel = (id, type) => {
  if (id + 1 == config.steps.length) {
    emit('done')
    return
  }
  {
    index.value = type == 'next' ? id + 1 : id - 1
    active = config.steps[index.value]
    handleIntro()
  }
}
const addMask = (domId) => {
  const targetElement = document.getElementById(domId)
  const maskCanvas = maskCanvasRef.value
  console.log('maskCanvas', maskCanvas)
  const ctx = maskCanvas.getContext('2d')

  // 获取目标 DOM 元素的宽高和位置信息
  const { width, height, top, left } = targetElement.getBoundingClientRect()

  // 设置遮罩层 Canvas 的样式和大小
  maskCanvas.style.position = 'fixed'
  maskCanvas.style.top = '0'
  maskCanvas.style.left = '0'
  maskCanvas.style.width = '100%'
  maskCanvas.style.height = '100%'
  maskCanvas.width = window.innerWidth
  maskCanvas.height = window.innerHeight

  // 清除遮罩层 Canvas 上的区域
  ctx.clearRect(0, 0, maskCanvas.width, maskCanvas.height)

  // 绘制遮罩层 Canvas 上的遮罩区域
  ctx.fillStyle = 'rgba(0, 0, 0, 0.6)'
  ctx.fillRect(0, 0, maskCanvas.width, maskCanvas.height)
  ctx.clearRect(left, top, width, height)
}

const addInfoModule = (domId) => {
  const targetElement = document.getElementById(domId)
  const infoModule = document.getElementById('infoModule')
  const targetRect = targetElement.getBoundingClientRect()
  const infoModuleRect = infoModule.getBoundingClientRect()
  const { innerWidth, innerHeight } = window
  // 可以根据优先级确定说明模块的位置
  handleLeftOrRight(infoModule, targetRect, infoModuleRect, innerWidth, innerHeight)
  // 控制上下
  handleTopOrBottom(infoModule, targetRect, infoModuleRect, innerHeight)
}

// 控制 右侧优先 再左侧
const handleLeftOrRight = (infoModule, targetRect, infoModuleRect, innerWidth, innerHeight) => {
  // 默认右侧
  if (targetRect.right + infoModuleRect.width <= innerWidth) {
    infoModule.style.left = targetRect.right + 'px'
  } else if (targetRect.left - infoModuleRect.width >= 0) {
    // 左侧
    infoModule.style.left = targetRect.left - infoModuleRect.width + 'px'
  }
}

// 控制上下
const handleTopOrBottom = (infoModule, targetRect, infoModuleRect, innerHeight) => {
  let top = 0
  if (targetRect.bottom + infoModuleRect.height <= innerHeight) {
    top = targetRect.bottom - targetRect.height
  } else if (targetRect.top - infoModuleRect.height >= 0) {
    // 上方
    top = targetRect.top + targetRect.height - infoModuleRect.height
  }

  infoModule.style.top = top + 'px'
}

const handleIntro = () => {
  addMask(active.domId)
  addInfoModule(active.domId)
}
onMounted(() => {
  //   setTimeout(() => {
  //     addMask()
  //     addInfoModule()
  //   }, 1000)

  nextTick(() => {
    handleIntro()
    window.addEventListener('resize', handleIntro)
  })
})
</script>

<style lang="scss" scoped>
.intro-warpper {
  .mask-canvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 0;
  }
  .info-module {
    position: fixed;
    z-index: 1;
    width: 200px;
    height: 100px;
    background-color: #3360e5;
    color: #fff;
    border-radius: 8px;
    padding: 8px 8px 4px 8px;
    display: flex;
    flex-direction: column;
    font-size: 12px;
    .title {
      height: 30px;
      font-size: 14px;
      display: flex;
      justify-content: space-between;
    }
    .content {
      flex: 1;
      padding: 12px 0;
    }
    .foot {
      height: 30px;
      display: flex;
      justify-content: space-between;
    }
    //   border: 1px solid rgba(255, 255, 255, 0.15);
    // &::after {
    //   content: '';
    //   width: 13px;
    //   height: 13px;
    //   background: #3360e5;
    //   position: absolute;
    //   top: -6px;
    //   right: 16px;
    //   transform: rotate(45deg);
    //   border-top: 1px solid rgba(255, 255, 255, 0.15);
    //   border-left: 1px solid rgba(255, 255, 255, 0.15);
    // }
  }
}
</style>
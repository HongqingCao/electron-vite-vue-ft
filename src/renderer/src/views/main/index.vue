<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: codercao
 * @Date: 2024-03-10 00:50:09
 * @LastEditors: codercao
 * @LastEditTime: 2024-03-17 13:59:37
-->

<template>
  <div class="main-warpper">
    <Layout>
      <!-- todo 暂时只上图，正在更新中 -->
      <!-- <div class="my-main"></div> -->
    </Layout>
    <Intro v-if="showIntro" :config="config" @done="showIntro = false"></Intro>
  </div>
</template>

<script setup>
import Layout from '../../components/Layout/index.vue'
import Intro from '../../components/Intro/index.vue'
import { ref } from 'vue'

const showIntro = ref(true)
const config = {
  prevLabel: '上一步',
  nextLabel: '下一步',
  skipLabel: '跳过',
  doneLabel: '完成',
  steps: [
    {
      domId: 'logoid',
      title: 'logo区域',
      content: '这里是展示的系统logo，点击可以回到首页内容',
      width: 270, //（可选）框选区域自定义宽度，当不指定时，组件自动取目标元素的宽度
      height: 120 //（可选）框选区域自定义高度，当不指定时，组件自动取目标元素的高度
    },
    {
      domId: 'menuHome',
      title: '菜单',
      content: '这里是展示的系统菜单区域',
      width: 200,
      height: 120
    },
    {
      domId: 'menuSetting',
      title: '菜单设置',
      content: '点击此处可以展开/合上菜单',
      width: 220,
      height: 120
    },
    {
      domId: 'footLeft',
      title: '底部行情',
      content: '这里展示的底部行情，鼠标移入会暂停滚动',
      width: 270,
      height: 120
    }
  ]
}
</script>

<style lang="scss" scoped>
.main-warpper {
  width: 100%;
  height: 100%;
  background-color: #191c1f;
  .my-main {
    width: 100%;
    height: 100%;
    background: url(../../assets/home.png);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
}
</style>


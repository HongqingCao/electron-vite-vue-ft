<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: codercao
 * @Date: 2024-03-10 20:41:10
 * @LastEditors: codercao
 * @LastEditTime: 2024-03-11 23:05:51
-->
<template>
  <header class="top-header">
    <nav class="navbar">
      <div class="left">
        <img class="logo" src="../../assets/icon.png" />
        <span class="title">FT金融终端</span>
      </div>
      <div class="middle"  style="-webkit-app-region: drag"></div>
      <div class="right">
        <el-icon @click="seting"><Setting /></el-icon>
        <el-icon @click.stop="minimize"><Minus /></el-icon>
        <el-icon @click.stop="maximize"><FullScreen /></el-icon>
        <el-icon @click.stop="close"><Close /></el-icon>
      </div>
    </nav>
  </header>
</template>
<script setup>
const { ipcRenderer } = window?.electron || ''
import { ElNotification } from 'element-plus'
import { ref } from 'vue'
const handleSelect = () => {}
const querySearch = () => {}
// 设置
const seting = () => {
  ElNotification({
    title: '提示',
    message: '设置暂未开发',
    type: 'warning',
    duration: 1000,
    isMaximized: false // 记录窗口是否已最大化
  })
}
// 最小化
const minimize = () => ipcRenderer.send('minimize')

// 最大话
const maximize = () => {
  ipcRenderer.send('mainWindowMaximize',)
}
// 关闭窗口
const close = () => {
  ipcRenderer.send('mainWindowclose')
}
</script>
<style lang="scss" scoped>
.top-header {
  height: 40px;
  background-color: #212529;
  padding: 0 8px;
  .navbar {
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    .left {
      display: flex;

      .logo {
        width: 32px;
        height: 32px;
      }
      .title {
        line-height: 32px;
        color: #56a4ff;
        padding: 0 8px;
      }
    }
    .middle {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
    }
    .right {
      color: #dee2e6;
      .el-icon {
        padding: 4px;
        border-radius: 2px;
        &:hover {
          background-color: #383c40;
        }
      }
    }
  }
}
</style>
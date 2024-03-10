<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: codercao
 * @Date: 2024-03-10 21:47:15
 * @LastEditors: codercao
 * @LastEditTime: 2024-03-10 22:28:21
-->
<template>
  <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
      <el-radio-button :value="false">expand</el-radio-button>
      <el-radio-button :value="true">collapse</el-radio-button>
    </el-radio-group> -->
  <div class="menu-warpper">
    <el-menu
      default-active="2"
      class="my-menu"
      :collapse="isCollapse"
      @open="handleOpen"
      :popper-offset="8"
      @close="handleClose"
    >
      <el-menu-item index="1">
        <el-icon><HomeFilled /></el-icon>
        <template #title>首页</template>
      </el-menu-item>
      <el-sub-menu index="2">
        <template #title>
          <el-icon><TrendCharts /></el-icon>
          <span>债券</span>
        </template>
        <el-menu-item-group>
          <template #title><span>市场资讯</span></template>
          <el-menu-item index="1-1">舆情资讯</el-menu-item>
          <el-menu-item index="1-2">央行动态</el-menu-item>
          <el-menu-item index="1-3">债券研报</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="一级市场">
          <el-menu-item index="1-4">一级总览</el-menu-item>
        </el-menu-item-group>
        <el-sub-menu index="1-5">
          <template #title><span>可转债</span></template>
          <el-menu-item index="1-5-1">可转债综合屏</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>

      <el-menu-item index="3" disabled>
        <el-icon><document /></el-icon>
        <template #title>基金</template>
      </el-menu-item>
      <el-menu-item index="4">
        <el-icon><DocumentRemove /></el-icon>
        <template #title>资讯</template>
      </el-menu-item>
    </el-menu>

    <div class="setting">
      <el-icon class="my-setting" @click="handleCollapse">
        <Fold v-if="isCollapse" />
        <Expand v-else />
      </el-icon>
    </div>
  </div>
</template>
  
<script lang="ts" setup>
import { ref } from 'vue'
import { Document, Menu as IconMenu, Location, Setting } from '@element-plus/icons-vue'

let isCollapse = ref(true)
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleCollapse = () => {
  isCollapse.value = !isCollapse.value
}
</script>
<style lang="scss">
.menu-warpper {
  height: 100%;
  background-color: #212529;
  .my-menu {
    height: calc(100% - 80px);
    border: 0px;
    &:not(.el-menu--collapse) {
      width: 140px;
    }
  }
  .setting {
    display: flex;
    justify-content: center;
    align-items: center;
    .my-setting {
      cursor: pointer;
    }
  }
}
</style>
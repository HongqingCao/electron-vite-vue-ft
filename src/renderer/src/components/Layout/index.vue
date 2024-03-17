<!--
 * @Description: 布局组件
 * @Version: 1.0
 * @Autor: codercao
 * @Date: 2024-03-10 20:39:31
 * @LastEditors: codercao
 * @LastEditTime: 2024-03-16 21:56:16
-->
<template>
  <div class="layout-warpper">
    <myheader></myheader>
    <div class="main-warpper">
      <leftMenu></leftMenu>
      <div class="main-main">
        <slot></slot>
      </div>
    </div>
    <foot></foot>
  </div>
</template>
<script setup>
import myheader from './header.vue'
import leftMenu from './leftMenu.vue'
import foot from './foot.vue'


</script>

<style lang="scss" scoped>
.layout-warpper {
  width: 100%;
  height: 100%;
  .main-warpper {
    height: calc(100% - 80px);
    display: flex;
    .main-main {
      flex: 1;
      height: 100%;
    }
  }
}
</style>
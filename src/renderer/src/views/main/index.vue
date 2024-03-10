<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: codercao
 * @Date: 2024-03-10 00:50:09
 * @LastEditors: codercao
 * @LastEditTime: 2024-03-10 22:39:21
-->
<script setup>
import Layout from '../../components/Layout/index.vue'
</script>

<template>
  <div class="main-warpper">
    <Layout>
      <!-- todo 暂时只上图，正在更新中 -->
      <div class="my-main"></div>
    </Layout>
  </div>
</template>

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


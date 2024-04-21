<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: codercao
 * @Date: 2024-04-16 22:23:54
 * @LastEditors: codercao
 * @LastEditTime: 2024-04-21 16:24:54
-->
<template>
  <section class="chat-right-top">
    <img class="logo" :src="user" />
    <h3 class="name">小融</h3>
  </section>
</template>

<script setup lang="ts">
import user from '../img/user.png'
</script>

<style scoped lang="scss">
.chat-right-top {
  padding: 4px 12px;
  display: flex;
  align-items: center;
  background-color: #212529;
  .logo {
    width: 28px;
    height: 28px;
    border-radius: 14px;
    margin-right: 8px;
  }
}
</style>

<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: codercao
 * @Date: 2024-04-16 22:23:15
 * @LastEditors: codercao
 * @LastEditTime: 2024-04-21 20:39:48
-->
<template>
  <div class="AiChat">
    <SideBar></SideBar>
    <ChatList></ChatList>
  </div>
</template>

<script>
import SideBar from './components/SideBar.vue'
import ChatList from './components/ChatList.vue'

export default {
  name: 'AiChart',
  components: {
    ChatList,
    SideBar
  }
}
</script>

<style>
.AiChat {
  display: flex;
  flex-direction: row;
  height: 100%;
}
</style>

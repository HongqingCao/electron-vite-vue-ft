<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: codercao
 * @Date: 2024-03-07 22:56:26
 * @LastEditors: codercao
 * @LastEditTime: 2024-03-16 18:06:22
-->
<template>
  <div id="app" class="app" >
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'app'
}
</script>

<style type="text/css">
html {
  /* 禁用html的滚动条，因为用的无框架窗口，默认就会有一个滚动条，所以去掉 */
  overflow-y: hidden;
  font-size: 12px;
}

/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
  width: 2px; /*滚动条宽度*/
  /*height: 2px;  !*滚动条高度*!*/
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  /*-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);*/
  /*border-radius: 10px;  !*滚动条的背景区域的圆角*!*/
  /*background-color: red;!*滚动条的背景颜色*!*/
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 99px; /*滚动条的圆角*/
  /*-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);*/
  /*background-color: green;  !*滚动条的背景颜色*!*/
}
body {
  margin: 0;
  padding: 0;
}
.app {
  height: 100vh;
  width: 100%;
}
</style>

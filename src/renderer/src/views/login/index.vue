<!--
 * @Description: login
 * @Version: 1.0
 * @Autor: codercao
 * @Date: 2024-03-08 22:23:27
 * @LastEditors: codercao
 * @LastEditTime: 2024-04-01 21:33:50
-->
<template>
  <div class="login-warpper" style="-webkit-app-region: drag">
    <div class="overlay-left">
      <h1>Hello,朋友</h1>
      <p>欢迎使用FT金融终端！</p>
    </div>
    <div class="sign-up-container">
      <div class="set-warpper" style="-webkit-app-region: no-drag">
        <el-icon @click="seting"><Setting /></el-icon>
        <el-icon @click.stop="minimize"><Minus /></el-icon>
        <el-icon @click.stop="close"><Close /></el-icon>
      </div>
      <h1>登录</h1>
      <div class="sign-warpper" style="-webkit-app-region: no-drag">
        <input type="text" placeholder="用户名/手机号码" v-model="state.count" />
        <input type="password" v-model="state.password" placeholder="密码" />
        <span class="info">{{ state.info }}</span>
        <button class="form_btn" @click="login">登录</button>
        <span class="forget">忘记密码</span>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive, watch } from 'vue'
const { ipcRenderer } = window?.electron || ''
import { ElNotification } from 'element-plus'

// 使用 reactive 创建响应式对象
const state = reactive({
  count: 'admin',
  password: '1234',
  info: ''
})

// 设置
const seting = () => {
  ElNotification({
    title: '提示',
    message: '设置暂未开发',
    type: 'warning',
    duration: 1000
  })
}
// 最小化
const minimize = () => ipcRenderer.send('minimize')
// 关闭窗口
const close = () => {
  ipcRenderer.send('close')
}

const login = () => {
  if (state.count && state.password) {
    state.info = ''
    ipcRenderer && ipcRenderer.send('openMainWindow')
  } else {
    state.info = '账户或者密码错误！'
  }
}
watch([() => state.count, () => state.password], () => {
  state.info = ''
})
</script>

<style lang="scss" scoped>
.login-warpper {
  width: 100%;
  height: 480px;
  border-radius: 10px;
  background: #ebecf0;
  display: flex;
  .sign-up-container {
    width: 50%;
    height: 100%;
    transition: all 0.5s;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    .set-warpper {
      position: absolute;
      top: 0px;
      right: 0px;
      display: flex;
      align-items: flex-end;
      padding: 8px;
      .el-icon {
        padding: 4px;
        border-radius: 2px;
        color: #606266;
        &:hover {
          background-color: #d4d6db;
        }
      }
    }
    h1 {
      color: #000;
    }
    .sign-warpper {
      display: flex;
      flex-direction: column;
      .info {
        height: 12px;
        display: inline-block;
        color: #e6a23c;
        font-size: 12px;
      }
      input {
        background: #eee;
        padding: 16px;
        margin: 8px 0;
        width: 200px;
        border: 0;
        outline: 0;
        border-radius: 20px;
        box-shadow: inset 7px 2px 10px #babebc, inset -5px -5px 12px #fff;
        color: #000;
      }
      .form_btn {
        margin-top: 20px;
        box-shadow: -5px -5px 10px #fff, 5px 5px 8px #babebc;
        border-radius: 20px;
        padding: 15px 45px;
        border: 0;
        background: none;
        color: #000;
        cursor: pointer;
      }
      .forget {
        margin-top: 12px;
        font-size: 12px;
        color: #000;
        letter-spacing: 0.5px;
        margin-bottom: 10px;
        cursor: pointer;

        &:hover {
          color: #3360e5;
        }
      }
    }
  }
  .overlay-left {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 0 50px;
    justify-content: center;
    align-items: center;
    background-color: #3360e5;
    color: #fff;
    transition: all 0.5s;
  }
}
</style>
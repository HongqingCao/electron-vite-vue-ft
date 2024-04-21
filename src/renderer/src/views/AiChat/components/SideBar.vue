<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: codercao
 * @Date: 2024-04-16 22:23:54
 * @LastEditors: codercao
 * @LastEditTime: 2024-04-21 20:39:29
-->
<template>
  <div class="chat-side">
    <div class="chat-side-head">
      <el-button :icon="Grid">探索</el-button>
      <el-button type="primary" :icon="Plus">新建对话</el-button>
    </div>
    <div class="bot-list">
      <div
        class="bot-item"
        v-for="(item, index) in state.list"
        :key="item.name"
        :class="[index == state.active ? 'active' : '']"
        @click="state.active = index"
      >
        <div class="bot-avatar">
          <div class="bot-name">{{ item.name }}</div>
          <el-icon class="my-close"><Close /></el-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { Plus, Grid } from '@element-plus/icons-vue'
//import user from '../img/user.png'

const state = reactive({
  active: 0,
  list: [
    {
      name: '行情',
      content: '阿里巴巴的行情',
      time: '2024-04-21 22:11:05'
    },
    {
      name: '公司公告',
      content: '招商银行的公司公告',
      time: '2024-04-21 22:11:05'
    }
  ]
})
</script>

<style lang="scss">
.chat-side {
  width: 240px;
  min-width: 240px;
  margin: 4px 0 4px 4px;
  border-radius: 4px;
  // border-top-left-radius: 4px;
  // border-bottom-left-radius: 4px;
  background-color: #212529;
  // border-right: 1px solid #495057;
  padding: 12px;
  .bot-list {
    padding-top: 12px;
    .bot-item {
      padding: 6px;
      border-radius: 4px;
      cursor: pointer;
      .bot-avatar {
        height: 28px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .bot-name {
          width: calc(100% - 30px);
        }
        .my-close {
          display: none;
        }
      }

      .bot-info {
        flex: 1;
      }
      &:hover {
        background-color: rgba(64, 158, 255, 0.1);
        .my-close {
          display: block;
        }
      }
    }
    .active {
      background-color: rgba(64, 158, 255, 0.1);
      color: #e5eaf3;
    }
  }
}
</style>
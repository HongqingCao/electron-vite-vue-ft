<template>
  <div class="chat-list">
    <el-scrollbar ref="messagesRef" class="chat-content">
      <div
        class="chat-content-warpper"
        v-for="(message, index) in bots[currentBotIndex].messages"
        :key="index"
      >
        <div class="chat-user">
          <div class="chat-img">
            <img class="img" :src="[message.sender === 'user' ? userPng : aiPng]" />
          </div>
          <div class="chat-warpper">
            <div class="time">
              <cite
                >{{ message.sender }}<i>{{ message.time }}</i></cite
              >
            </div>
            <div
              v-if="message.img"
              :class="[message.sender === 'user' ? '' : 'chat-pre']"
              style="white-space: pre-wrap"
            >
              <img class="test-img" :src="CMB" />
            </div>
            <div
              v-else
              :class="[message.sender === 'user' ? '' : 'chat-pre']"
              style="white-space: pre-wrap"
              v-text="message.content"
            ></div>
          </div>
        </div>
      </div>
    </el-scrollbar>

    <section class="foot">
      <el-icon class="my-delete"><Delete /></el-icon>
      <el-input v-model="input1" size="large" placeholder="与小融GPT交谈">
        <template #suffix>
          <el-icon class="my-position" @click="sendMsg"><Position /></el-icon> </template
      ></el-input>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { Search } from '@element-plus/icons-vue'
import userPng from '../img/user.png'
import aiPng from '../img/ai.png'
import CMB from '../img/CMB.png'
const input1 = ref('')
const currentBotIndex = ref(0)
const bots = reactive([
  {
    messages: [
      //   {
      //     sender: 'user',
      //     content: '招商银行今日行情',
      //     time: '2024-04-21 22:11:05'
      //   },
      //   {
      //     sender: '小融',
      //     content: '',
      //     time: '2024-04-21 22:11:05',
      //     img: true
      //   },
      //   {
      //     sender: 'user',
      //     content: '阿里巴巴的行情',
      //     time: '2024-04-21 22:11:05'
      //   },
      //   {
      //     sender: '小融',
      //     content:
      //       '哎呀，小融可能在休息！别担心，我们的技术超人正在把它召唤回来。在此期间，您可以尝试刷新页面。感谢您的耐心等待！',
      //     time: '2024-04-21 22:11:05'
      //   }
    ]
  }
])

const sendMsg = () => {
  bots[currentBotIndex.value].messages.push({
    sender: 'user',
    content: '招商银行今日行情',
    time: '2024-04-21 22:11:05'
  })
  bots[currentBotIndex.value].messages.push({
    sender: '小融',
    content: '',
    time: '2024-04-21 22:11:05',
    img: true
  })
}
</script>

<style lang="scss">
.chat-list {
  flex: 1;
  padding: 24px 0px 4px 8px;
  .chat-content {
    height: calc(100% - 60px);
    padding-right: 60px;
    .chat-content-warpper {
      margin-bottom: 24px;
      .chat-user {
        text-align: left;
        padding-left: 60px;
        padding-right: 0;
        display: flex;
        .chat-img {
          left: 3px;
          padding-top: 8px;
          .img {
            width: 28px;
            height: 28px;
            border-radius: 14px;
          }
        }
        .chat-warpper {
          padding-left: 24px;
          flex: 1;
          .time {
            cite {
              font-style: normal;
              line-height: 24px;
              font-size: 12px;
              white-space: nowrap;
              color: #999;
              text-align: left;
              i {
                font-style: normal;
                padding-left: 5px;
                padding-right: 5px;
                font-size: 12px;
              }
            }
          }
          .chat-pre {
            margin-left: 0;
            text-align: left;
            background-color: #33df83;
            color: #fff;
            position: relative;
            line-height: 22px;
            /*margin-top: 25px;*/
            padding: 10px 15px;
            border-radius: 3px;
            color: #333;
            word-break: break-all;

            &:after {
              left: -10px;
              right: auto;
              border-top-color: #33df83;
              content: '';
              position: absolute;
              left: -10px;
              top: 15px;
              width: 0;
              height: 0;
              border-style: solid dashed dashed;
              border-color: #33df83 transparent transparent;
              overflow: hidden;
              border-width: 10px;
            }
            .test-img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
  }
  .foot {
    display: flex;
    align-items: center;
    .my-delete {
      margin: 0 24px;
      display: flex;
      justify-content: center;
    }
    .my-position {
      cursor: pointer;
    }
  }
}
</style>
<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: codercao
 * @Date: 2024-03-10 21:51:03
 * @LastEditors: codercao
 * @LastEditTime: 2024-03-10 22:46:51
-->
<template>
  <div class="foot-warpper">
    <div class="left"></div>
    <div class="right">
      <el-autocomplete
        size="mini"
        v-model="keyvalue"
        :fetch-suggestions="querySearch"
        clearable
        class="inline-input w-50"
        placeholder="股票/债券/基金"
        @select="handleSelect"
      />
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const keyvalue = ref('')
const handleSelect = () => {}
const querySearch = () => {}
</script>
<style lang="scss" scoped>
.foot-warpper {
  height: 40px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
 
  background-color: #212529;
  .right{
    display: flex;
    height: 40px;
    align-items: center;
    padding: 0 8px;
  }
}
</style>
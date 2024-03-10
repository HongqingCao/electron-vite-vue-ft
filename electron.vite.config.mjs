/*
 * @Description: 
 * @Version: 1.0
 * @Autor: codercao
 * @Date: 2024-03-07 22:56:26
 * @LastEditors: codercao
 * @LastEditTime: 2024-03-08 22:59:55
 */
import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src')
      }
    },
    plugins: [vue()]
  }
})

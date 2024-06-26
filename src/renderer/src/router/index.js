/*
 * @Description: 
 * @Version: 1.0
 * @Autor: codercao
 * @Date: 2024-03-08 23:46:15
 * @LastEditors: codercao
 * @LastEditTime: 2024-04-21 00:18:10
 */
import { createRouter, createWebHistory } from 'vue-router'
//import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/main/index.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/index.vue')
    },
    {
      path: '/aiChat',
      name: 'aiChart',
      component: () => import('../views/AiChat/index.vue')
    }
  ]
})

export default router

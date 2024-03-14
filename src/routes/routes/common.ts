import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'HomePage',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/line',
    name: 'LinePage',
    component: () => import('@/views/Line.vue')
  },
  {
    path: '/fullpage',
    name: 'FullPage',
    component: () => import('@/views/Fullpage.vue')
  },
  {
    path: '/login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/img/lazy',
    component: () => import('@/views/common/ImgLazy.vue')
  }
]

export default routes

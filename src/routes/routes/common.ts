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
  }
]

export default routes

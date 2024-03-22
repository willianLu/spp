import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/blog',
    component: () => import('@/views/blog/index.vue')
  },
  {
    path: '/blog/:id',
    component: () => import('@/views/blog/content.vue')
  }
]

export default routes

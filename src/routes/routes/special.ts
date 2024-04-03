import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/special/star',
    component: () => import('@/views/special/star.vue')
  },
  {
    path: '/special/turntable',
    component: () => import('@/views/special/turntable.vue')
  }
]

export default routes

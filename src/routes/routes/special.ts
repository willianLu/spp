import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/special/star',
    component: () => import('@/views/special/star.vue')
  },
  {
    path: '/special/turntable',
    component: () => import('@/views/special/turntable.vue')
  },
  {
    path: '/special/tank',
    component: () => import('@/views/special/tankModel.vue')
  },
  {
    path: '/special/lotus',
    component: () => import('@/views/special/lotus.vue')
  }
]

export default routes

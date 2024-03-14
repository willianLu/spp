import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/game/puzzle',
    component: () => import('@/views/game/Puzzle.vue')
  }
]

export default routes

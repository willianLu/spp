import { defineStore } from 'pinia'
import { userLogin, queryUserInfo } from '@/api/user'
import { UserInfo } from '@/types'
import { setToken, removeToken } from '@/utils/token'

/**
 * @description 用户相关的全局数据状态管理，包括：用户信息，登录信息等
 */
export default defineStore('user', {
  state: (): {
    token: string
    // 标记路由变化的动作
    userInfo?: UserInfo
  } => {
    return {
      token: ''
    }
  },
  actions: {
    async login(data: any) {
      const [res, err] = await userLogin(data)
      if (res && res.status === 200) {
        this.token = res.data.token
        setToken(res.data.token)
      }
      return [res, err]
    },
    logout() {
      this.token = ''
      removeToken()
    },
    async getUserInfo() {
      const [res, err] = await queryUserInfo()
      if (res && res.code === 200) {
        this.userInfo = res.data
      }
      return [res, err]
    }
  }
})

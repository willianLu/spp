import { get, post } from '@/utils/http'
import { UserInfo } from '@/types'
import Config from '@/config'

// 用户登录
export function userLogin(data: any) {
  return post<unknown, unknown, 'gs'>(Config.domain.gs + '/login', data)
}

export function queryUserInfo() {
  return get<UserInfo>(Config.domain.tc + '/user/info')
}

export function queryImgCode() {
  return get<any, unknown, 'qt'>(
    Config.domain.qt + '/product/imageCode',
    { userData: 122323 },
    {
      skipCommonData: true
    }
  )
}

export function queryTcUserInfo() {
  return get(Config.domain.qt + '/user/info')
}

export function queryList() {
  return post('/product/list', {
    token: '774855A133F80E0F5F6ED26B294AE22F_WEB_PR8GUTY54DGRQDWZ',
    version: '2.0.0',
    grade: 'a1',
    cityCode: 340100,
    ruCode: 3401002,
    device: 2
  })
}

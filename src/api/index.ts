import { get, post } from '@/utils/http'
import { jsonp } from 'vue-jsonp'

// 用户IP所在地地址
export function queryLocationByIp() {
  return jsonp('https://api.map.baidu.com/location/ip', {
    ak: 'HDPFYuBGXtZggMGbl3Hr4S8gh9sr0Wai',
    coor: 'bd09ll'
  })
}
// 用户IP所在地天气信息
export function queryWeatcherNow(data: any) {
  return get('https://devapi.qweather.com/v7/weather/24h', {
    key: '435c16c50d34411e90959bcf9d30dd6c',
    location: data.location
  })
}

// 请求测试
export function queryUserInfo(data) {
  return get('/api/user/info', data)
}

export function queryUserList(data) {
  return post('/api/user/list', data, {
    isFormData: true
  })
}

export function queryOther(data) {
  return post('/qtapi/user', data)
}

export function queryTest(data) {
  return post('/server/api/user', data)
}

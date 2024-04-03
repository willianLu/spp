import { defineStore } from 'pinia'
import { queryLocationByIp, queryWeatcherNow } from '@/api/index'
import { local } from '@/utils/storage'

/**
 * @description 用户相关的全局数据状态管理，包括：用户信息，登录信息等
 */
export default defineStore('home', {
  state: (): {
    locationData: Record<string, string>
    weatherData: Array<Record<string, string>>
  } => {
    return {
      locationData: local.getItem('LocationData') || {},
      weatherData: local.getItem('WeatherData') || []
    }
  },
  actions: {
    async getLocationData() {
      if (this.locationData.city) {
        this.getWeatherData()
        return this.locationData
      }
      const res = await queryLocationByIp()
      if (res && res.status === 0) {
        const { address_detail, point } = res.content
        this.locationData = {
          ...address_detail,
          ...point
        }
        local.setItem('LocationData', this.locationData, {
          maxAge: '24h'
        })
        this.getWeatherData()
        return this.locationData
      }
    },
    async getWeatherData() {
      if (this.weatherData.length) {
        return this.weatherData
      }
      const { locationData } = this
      const [res] = await queryWeatcherNow({
        location: `${locationData.x},${locationData.y}`
      })
      if (res && res.code == 200) {
        this.weatherData = res.hourly.map((item: any) => {
          item.timestamp = new Date(item.fxTime).getTime()
          return item
        })
        local.setItem('WeatherData', this.weatherData, {
          maxAge: '24h'
        })
        return this.weatherData
      }
    }
  }
})

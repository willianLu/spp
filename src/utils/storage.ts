import ms from './ms'
import { isObject } from './util'
import Env from '@/env'
import { StorageOptions, StorageData } from '@/types'

/**
 * @description 本地存储扩展规则
 * @param {string | number} maxAge 有效时间，单位 { 年：y, 周：w, 天: d, 小时：h, 分钟：m, 秒：s, 毫秒：ms }
 */
export const local = {
  /**
   * @description 设置对应键名的存储值
   * @param {string} key 键名
   * @param {any} value 存储值
   * @param {object | undefined} options LocalStorageOptions 本地存储扩展规则
   * @returns {void}
   */
  setItem(key: string, value: any, options: StorageOptions = {}) {
    const timestamp = new Date().getTime()
    const maxAge = options.maxAge
    const data: StorageData = {
      value
    }
    if (maxAge) {
      data.timestamp = timestamp
      data.maxAge = maxAge
    }
    window.localStorage.setItem(key, JSON.stringify(data))
  },
  /**
   * @description 获取对应键名的存储值
   * @param {string} key 键名
   * @returns {any}
   */
  getItem<T = any>(key: string): T {
    const res = window.localStorage.getItem(key)
    let data!: StorageData
    try {
      data = res ? JSON.parse(res) : {}
    } catch (error) {
      if (!Env.isProd) {
        console.error(error)
      }
    }
    if (!isObject(data)) return undefined as any
    if (data.timestamp && data.maxAge) {
      const now = new Date().getTime()
      const maxAge = ms(data.maxAge)
      if (now - data.timestamp > maxAge) {
        window.localStorage.removeItem(key)
        return undefined as any
      }
    }
    return data.value as any
  },
  /**
   * @description 移除对应健名的存储值
   */
  removeItem(key: string) {
    window.localStorage.removeItem(key)
  },
  /**
   * @description 清除所有本地存储
   */
  clear: window.localStorage.clear,
  /**
   * @description 返回存储中的第 n 个键名
   * @param {number} n 数值
   * @returns {string | null}
   */
  key(n: number) {
    return window.localStorage.key(n)
  },
  /**
   * @description 获取当前存储在Storage对象中的数据项数量
   */
  length() {
    return window.localStorage.length
  }
}

export const session = {
  /**
   * @description 设置对应键名的存储值
   * @param {string} key 键名
   * @param {any} value 存储值
   * @returns {void}
   */
  setItem(key: string, value: any) {
    const data = {
      value
    }
    window.sessionStorage.setItem(key, JSON.stringify(data))
  },
  /**
   * @description 获取对应键名的存储值
   * @param {string} key 键名
   * @returns {any}
   */
  getItem<T = any>(key: string): T {
    const res = window.sessionStorage.getItem(key)
    let data: any
    try {
      data = res ? JSON.parse(res) : {}
    } catch (error) {
      //
    }
    if (!isObject(data)) {
      return undefined as any
    }
    return data.value as any
  },
  /**
   * @description 移除对应健名的存储值
   */
  removeItem(key: string) {
    window.sessionStorage.removeItem(key)
  },
  /**
   * @description 清除所有本地存储
   */
  clear: window.sessionStorage.clear,
  /**
   * @description 返回存储中的第 n 个键名
   * @param {number} n 数值
   * @returns {string | null}
   */
  key(n: number) {
    return window.sessionStorage.key(n)
  },
  /**
   * @description 获取当前存储在Storage对象中的数据项数量
   */
  length() {
    return window.sessionStorage.length
  }
}

export default {
  local,
  session
}

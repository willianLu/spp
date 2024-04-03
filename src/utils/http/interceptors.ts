import { AxiosResponse } from 'axios'
import { handleRequestRule, handleResponseRule } from './tool'
import { CustomAxiosRequestConfig } from '@/types'

// 发出请求前拦截
const request = {
  /**
   * @description 发送请求拦截，处理请求参数
   * @param {object} options 请求配置
   * @returns {object} 处理后的配置数据
   */
  onFufilled(config: any): any {
    return handleRequestRule(config as CustomAxiosRequestConfig)
  },
  /**
   * @description 发送请求错误拦截
   * @param {unknown} error 请求错误信息
   * @returns {Promise} 返回错误信息
   */
  onRejected(error: any) {
    console.group('接口请求request错误')
    console.error(error)
    console.groupEnd()
    return Promise.reject(error)
  }
}

// 请求返回拦截
const response = {
  /**
   * @description 请求返回拦截，处理返回参数
   * @param {AxiosResponse} response 请求reponse对象
   * @returns {AxiosResponse} 返回response对象
   */
  onFufilled<T, D>(response: AxiosResponse<T, D>): AxiosResponse<T, D> {
    return handleResponseRule<T, D>(response)
  },
  /**
   * @description 请求返回错误拦截
   * @param {unknown} error response错误信息
   * @returns {Promise} 返回错误信息
   */
  onRejected(error: any) {
    console.group('接口请求reponse错误')
    console.error(error)
    console.groupEnd()
    return Promise.reject(error)
  }
}

export default {
  request,
  response
}

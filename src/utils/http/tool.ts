import { AxiosResponse } from 'axios'
import { CustomAxiosRequestConfig } from '@/types'

/**
 * @description 处理请求规则，多域名解析，请求公共参数
 * @param {Object} config 请求相关数据
 * @returns {Object}
 */
export function handleRequestRule(config: CustomAxiosRequestConfig) {
  return config
}

/**
 * @description 处理请求返回
 * @param { AxiosResponse } response 请求返回response对象
 * @returns {AxiosResponse}
 */
export function handleResponseRule<T, D>(response: AxiosResponse<T, D>) {
  return response
}

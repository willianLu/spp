import { AxiosResponse } from 'axios'
import { CustomAxiosRequestConfig } from '@/types'
import { buildFormData } from '@/utils/util'

/**
 * @description 处理请求规则，多域名解析，请求公共参数
 * @param {Object} config 请求相关数据
 * @returns {Object}
 */
export function handleRequestRule(config: CustomAxiosRequestConfig) {
  const { method, params, data, isFormData } = config
  // 根据请求类型，取不同的参数数据
  let _data = method === 'get' ? params : data
  // formData数据，特殊处理
  _data = isFormData ? buildFormData(_data) : _data

  if (method === 'get') {
    config.params = _data
  } else {
    config.data = _data
  }
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

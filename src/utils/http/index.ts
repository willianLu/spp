import axios, { AxiosInstance, AxiosResponse } from 'axios'
import interceptors from './interceptors'
import { CustomAxiosRequestConfig } from '@/types'

// 创建请求实例
const HttpRequest: AxiosInstance = axios.create({
  baseURL: ''
})

// 注册请求request拦截器
HttpRequest.interceptors.request.use(
  interceptors.request.onFufilled,
  interceptors.request.onRejected
)

// 注册请求response拦截器
HttpRequest.interceptors.response.use(
  interceptors.response.onFufilled,
  interceptors.response.onRejected
)
/**
 * @description request请求方式，包含get\post\put\delete\head\options\patch等
 * T 返回数据data的类型 例：返回数据{ code: 200, data: {} }，T 代表 data
 * D 请求参数的类型
 * M 返回数据的格式 例：{ code: 200, data: {}, message: ''}
 * U 使用origin则返回原始的response对象
 * @returns {Promise<[Data, Error]>} Data 数据；Error 是否报错，有报错时，则代表请求失败
 * 注意事项：使用async/awiat时，可以不用try/catch
 */
export function request<T, D>(
  config: CustomAxiosRequestConfig<D>
): Promise<[any | undefined, any | undefined]> {
  return new Promise<any>(resolve => {
    HttpRequest.request<T, AxiosResponse<any, D>, D>(config)
      .then(res => {
        resolve([config.backOriginResponse ? res : res.data])
      })
      .catch(error => {
        resolve([undefined, error])
      })
  })
}

/**
 * @description Get请求方法
 * @param {string} url 请求地址
 * @param {any} params 请求参数
 * @param {object | undefined} config 配置参数
 * @returns {Promise<any>}
 */

export async function get<T, D>(
  url: string,
  params?: D,
  config?: CustomAxiosRequestConfig<D>
) {
  config = config || {}
  return request<T, D>({
    ...config,
    url,
    method: 'get',
    params
  })
}

/**
 * @description Post请求方法
 * @param {string} url 请求地址
 * @param {object | undefined} params 请求参数
 * @param {object | undefined} config 配置参数
 * @returns {Promise<any>}
 */
export function post<T, D>(
  url: string,
  data?: D,
  config?: CustomAxiosRequestConfig<D>
) {
  config = config || {}
  return request<T, D>({
    ...config,
    url,
    method: 'post',
    data
  })
}

export default HttpRequest

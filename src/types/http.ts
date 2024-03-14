import { AxiosRequestConfig, AxiosResponse } from 'axios'

/**
 * @description 自定义请求配置参数
 */
export type CustomAxiosRequestConfig<T = any> = AxiosRequestConfig<T> & {
  originDomain?: string
  skipCommonData?: boolean
  isFormData?: boolean
  backOriginResponse?: boolean
}

/**
 * @description 默认请求返回数据
 */
export interface CustomResponseData<T = any> {
  code: number
  message: string
  data: T
}
/**
 * @description 请求域名gs.com返回数据
 */
export interface GsResponseData<T> {
  status: number
  message: string
  data: T extends unknown ? (unknown extends T ? any : T) : T
}

export interface TcResponseData<T = any> {
  code: number
  success: boolean
  message: string
  data: T
}

type ResponseDataMap<T> = {
  gs: GsResponseData<T>
  tc: TcResponseData<T>
  qt: GsResponseData<T>
}

type BackData<T, D> = D extends keyof ResponseDataMap<T>
  ? ResponseDataMap<T>[D]
  : CustomResponseData<T>

export type RequestBackData<T, D, M, U> = U extends 'origin'
  ? AxiosResponse<BackData<T, M>, D>
  : BackData<T, M>

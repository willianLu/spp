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

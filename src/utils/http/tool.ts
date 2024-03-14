import { AxiosResponse } from 'axios'
import { CustomAxiosRequestConfig } from '@/types'
import { isObject, isFunction, stringifyQuery } from '@/utils/util'
import {
  devProxy,
  commonParams,
  domainParams,
  commonResponse,
  domainResponse
} from './handleRequest'
import Env from '@/env'

/**
 * @description 处理域名代理
 * @param {object} config CustomAxiosRequestConfig
 */
function handleDomainProxy(config: CustomAxiosRequestConfig) {
  if (!Env.isDev || !devProxy) return
  const url = config.url || ''
  const hasDomain = isIncludeDomain(url)
  // 若url中包含域名，处理config.url
  // 若baseUrl中包含域名，处理confog.baseUrl
  if (hasDomain || config.baseURL) {
    const domain = (hasDomain ? url : config.baseURL) as string
    Object.keys(devProxy).some(key => {
      // 使用indexOf判断，预订域名与配置一致，减少处理逻辑
      if (domain.indexOf(key) === 0) {
        const _url = domain.replace(key, devProxy[key])
        // 记录原始域名，用于返回处理
        config.originDomain = key
        if (hasDomain) {
          config.url = _url
          // url中包含域名时，需要把baseURL设置为空，否则影响代理
          config.baseURL = ''
        } else {
          config.baseURL = _url
        }
        return true
      }
    })
  }
}
/**
 * @description 是否已包含域名
 * @param {string} url 请求url
 */
function isIncludeDomain(url: string) {
  // eslint-disable-next-line no-useless-escape
  return /^(http(s)?:)?\/\/([^\/\.])+\.[\w-]+/.test(url)
}
/**
 * @description 处理公共参数
 * @param {Object} config 请求相关数据
 * @returns {void}
 */
function handleCommonParams(config: CustomAxiosRequestConfig) {
  const { method, params, data, skipCommonData, isFormData, baseURL } = config
  // 根据请求类型，取不同的参数数据
  let _data = method === 'get' ? params : data
  // 不跳过公共参数处理，且参数是对象或者未设置参数
  if (!skipCommonData && (isObject(_data) || _data === undefined)) {
    const url = config.url || ''
    // 获取公共参数，不区分域名
    let comParams = commonParams || {}
    const hasDomain = isIncludeDomain(url)
    // 若存在域名参数单独处理
    if (domainParams && (hasDomain || baseURL)) {
      const domain = hasDomain ? url : baseURL
      // 在api上配置了域名处理
      Object.keys(domainParams).some(item => {
        if ((<string>domain).indexOf(item) === 0) {
          const fun = domainParams[item]
          const _params = isFunction(fun) ? fun() : domainParams[item]
          comParams = { ...comParams, ..._params }
          return true
        }
      })
    }
    _data = { ...comParams, ..._data }
  }
  // formData数据，特殊处理
  _data = isFormData ? stringifyQuery(_data) : _data

  if (method === 'get') {
    config.params = _data
  } else {
    config.data = _data
  }
}

/**
 * @description 处理请求规则，多域名解析，请求公共参数
 * @param {Object} config 请求相关数据
 * @returns {Object}
 */
export function handleRequestRule(config: CustomAxiosRequestConfig) {
  // 公共参数处理
  handleCommonParams(config)
  // 开发环境，请求域名代理处理
  handleDomainProxy(config)
  return config
}

/**
 * @description 处理请求返回
 * @param { AxiosResponse } response 请求返回response对象
 * @returns {AxiosResponse}
 */
export function handleResponseRule<T, D>(response: AxiosResponse<T, D>) {
  const { config } = response
  const originDomain = (<any>config).originDomain
  if (originDomain && domainResponse) {
    let fun: any
    Object.keys(domainResponse).some(key => {
      if (key === originDomain) {
        fun = domainResponse[key]
        return true
      }
    })
    if (fun) {
      return fun(response)
    }
  }
  return commonResponse ? commonResponse(response) : response
}

/**
 * @description 基础数据类型
 */
enum DataType {
  NUMBER = 'number',
  STRING = 'string',
  ARRAY = 'array',
  OBJECT = 'object',
  UNDEFINED = 'undefined',
  NULL = 'null',
  FUNCTION = 'function',
  PROMISE = 'promise',
  ERROR = 'error'
}

/**
 * @description 判断数据
 * @param {unknown} data 任意值
 */
export function isDef(data: unknown): boolean {
  return data !== undefined && data !== null
}

/**
 * @description 判断数据类型是否是传入的类型
 * @param {unknown} data 传入数据
 * @param {dataType} type 对比的数据类型
 * @returns {boolean} true | false
 */
function judgeDataType<T>(data: unknown, type: string): data is T {
  return (
    Object.prototype.toString.call(data).toLocaleLowerCase() ===
    `[object ${type}]`
  )
}

/**
 * @description 判断数据类型是否是对象
 * @param {unknown} data 传入的数据
 * @returns {boolean} true | false
 */
export function isObject<T = Record<any, unknown>>(data: unknown): data is T {
  return judgeDataType<Record<any, unknown>>(data, DataType.OBJECT)
}

/**
 * @description 判断数据类型是否是函数
 * @param {unknown} data 传入的数据
 * @returns {boolean} true | false
 */
export function isFunction<T = any>(
  data: unknown
): data is (...args: any[]) => T {
  return judgeDataType(data, DataType.FUNCTION)
}

/**
 * @description 判断数据类型是否是promise函数
 * @param {unknown} data 传入的数据
 * @returns {boolean} true | false
 */
export function isPromise<T>(data: unknown): data is Promise<T> {
  return judgeDataType<Promise<T>>(data, DataType.PROMISE)
}

/**
 * @description 判断数据类型是否是Error类型
 * @param {unknown} data 传入的数据
 * @returns {boolean} true | false
 */
export function isError(data: unknown): data is Error {
  return judgeDataType<Error>(data, DataType.ERROR)
}

/**
 * @description 判断数据类型是否是数字
 * @param {unknown} data 传入的数据
 * @returns {boolean} true | false
 */
export function isNumber(data: unknown): data is number {
  return (
    judgeDataType<number>(data, DataType.NUMBER) && !window.isNaN(<number>data)
  )
}

/**
 * @description 判断数据类型是否是字符串
 * @param {unknown} data 传入的数据
 * @returns {boolean} true | false
 */
export function isString(data: unknown): data is string {
  return judgeDataType<string>(data, DataType.STRING)
}

/**
 * @description 是否是空对象
 * @param {unknown} data
 * @returns {boolean}
 */
export function isEmptyObject(data: unknown): data is object {
  return isObject(data) && JSON.stringify(data) === '{}'
}
/**
 * @description 延迟函数
 * @param {undefuned | number} duration
 * @param {unknown} data
 * @returns {promise<T | undefined>}
 */
export function delay<T>(duration?: number, data?: T): Promise<T | undefined> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data)
    }, duration || 1000)
  })
}
/**
 * @description 将json转化为query字符串
 * @param {object} data json数据
 * @returns {string} query字符串
 */
export function stringifyQuery(data: Record<string | number | symbol, any>) {
  if (!isObject(data)) return ''
  return Object.keys(data)
    .map(key => {
      return `${key}=${data[key]}`
    })
    .join('&')
}

/**
 * @description px 转换为 vw单位
 * @param {string | number} count 需要转换的数量
 * @param {number} viewportWidth 参考设计稿宽度
 * @returns {string} 转换后的vw数值
 */
export function pxToRem(count: string | number, viewportWidth?: number) {
  viewportWidth = isNumber(viewportWidth) ? viewportWidth : 75
  if (isString(count) && count.endsWith('px')) {
    count = count.slice(0, count.length - 2)
  }
  if (/^\d+$/.test(`${count}`)) {
    return (Number(count) / viewportWidth).toFixed(6) + 'rem'
  }
  return count
}

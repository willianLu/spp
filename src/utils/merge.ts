import { isObject } from './util'

// 深度合并
function deepMerge(
  data: Record<string | number, any>,
  target: Record<string | number, any>,
  map: WeakMap<any, boolean>
) {
  // 不是对象或者已合并过的对象，将予以过滤
  if (!isObject(target) || map.has(target)) return
  map.set(target, true)
  for (const key in target) {
    const val = target[key]
    // 不是对象或者已合并过的对象，将直接赋值
    if (!isObject(val) || map.has(val)) {
      data[key] = val
    } else {
      // 不存在的key，赋予初始值
      if (!(key in data)) data[key] = {}
      deepMerge(data[key], val, map)
    }
  }
}

// 只做简单数据的合并, map或set类型未做处理
export default function (...args: Record<any, any>[]) {
  // 缓存对象map，用于过滤自引用循环
  const map: WeakMap<any, boolean> = new WeakMap()
  const data: Record<string | number, any> = {}
  args.forEach(obj => {
    deepMerge(data, obj, map)
  })
  return data
}

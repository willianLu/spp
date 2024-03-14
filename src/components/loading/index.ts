import { createApp } from 'vue'
import { showLoadingToast } from 'vant'
import 'vant/es/toast/style'
import LoadingOverlay from './overlay.vue'
import { isObject, isNumber, isString } from '@/utils/util'

/**
 * @description 将“loading背景”添加到body上
 */
const loadingOverlay = createApp(LoadingOverlay).mount(
  document.createElement('div')
)

// loading 弹窗实例
let LoadingToast: ReturnType<typeof showLoadingToast> | null = null

// 显示loading弹层
function showLoading(message: string) {
  LoadingToast = showLoadingToast({
    message,
    duration: 0,
    forbidClick: true
  })
}
// timeout延迟id
let timerId: ReturnType<typeof setTimeout> | null = null
// 关闭执行中的timeout
function closeTimeout() {
  if (timerId) {
    clearTimeout(timerId)
    timerId = null
  }
}

/**
 * @description loading参数
 * @param {string} message loading 文案
 * @param {number} delayTime 延迟展示loading时间
 * @param {boolean} immediate 是否立即执行loading
 */
interface LoadingOptions {
  message?: string
  delayTime?: number
  immediate?: boolean
}

const Loading = {
  /**
   * @description 是否显示加载动画
   */
  show(options?: number | string | LoadingOptions) {
    // 显示透明遮罩层
    document.body.appendChild(loadingOverlay.$el)
    let delayTime = 500
    let message = ''
    let immediate = false
    if (isNumber(options)) {
      delayTime = options
    } else if (isString(options)) {
      message = options
    } else if (isObject<LoadingOptions>(options)) {
      message = options.message || ''
      if (isNumber(options.delayTime)) {
        delayTime = options.delayTime
      }
      immediate = !!options.immediate
    }
    if (immediate || delayTime <= 0) {
      showLoading(message)
    } else {
      // 延迟执行loading操作
      timerId = setTimeout(() => {
        timerId = null
        showLoading(message)
      }, delayTime)
    }
  },
  hide() {
    // 关闭延迟操作
    closeTimeout()
    // 移除透明遮罩层
    document.body.removeChild(loadingOverlay.$el)
    if (LoadingToast) {
      LoadingToast.close()
      LoadingToast = null
    }
  }
}

export default Loading

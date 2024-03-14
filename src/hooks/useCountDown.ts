import { ref, onBeforeUnmount } from 'vue'
import { session } from '@/utils/storage'

// 倒计时属性
export type CountDownOptions = {
  // 倒计时缓存key
  key: string
  time?: number
  onChange?: (countDown: number) => void
  onFinish?: () => void
}

// 秒级倒计时处理
export default function handleCountDown(options?: CountDownOptions) {
  const { key, time = 60, onChange, onFinish } = options || {}
  const countDown = ref(0)
  let timeout: ReturnType<typeof setTimeout> | null = null
  // 初始化处理，计算验证码倒计时
  function handleInit() {
    // 没有key时，将不处理缓存
    if (!key) return
    const timestamp = session.getItem(key)
    if (!timestamp || typeof timestamp !== 'number') return
    const count = Number(((Date.now() - timestamp) / 1000).toFixed())
    if (count < time) {
      countDown.value = time - count
      handleCountDown()
    } else {
      session.removeItem(key)
    }
  }
  handleInit()
  // 开始执行倒计时
  function countDownStart() {
    countDown.value = time
    if (key) {
      session.setItem(key, Date.now())
    }
    handleCountDown()
  }
  // 处理验证码倒计时
  function handleCountDown() {
    timeout = setTimeout(() => {
      countDown.value--
      onChange && onChange(countDown.value)
      if (countDown.value) {
        handleCountDown()
      } else if (key) {
        session.removeItem(key)
        onFinish && onFinish()
      }
    }, 1000)
  }
  onBeforeUnmount(() => {
    if (timeout) {
      clearTimeout(timeout)
    }
  })

  return {
    countDown,
    countDownStart
  }
}

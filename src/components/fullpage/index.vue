<template>
  <!-- 最外层容器 -->
  <section
    ref="fullpage"
    class="fullpage-wrap"
    @wheel="handleWheel"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
    @touchcancel="handleTouchEnd"
  >
    <!-- 内层容器 -->
    <div
      ref="element"
      :class="{ 'fullpage-transtion': isTranstion }"
      class="fullpage-inner-box"
    >
      <slot></slot>
    </div>
    <!-- 指示器 -->
    <ul class="fullpage-aside">
      <li
        v-for="(item, index) in pageCount"
        :key="index"
        @click="handleChangePage(index)"
      >
        <span :class="{ 'fullpage-active': index === $index }"></span>
      </li>
    </ul>
  </section>
</template>
<script setup lang="ts">
import { ref, watchEffect, watch, computed } from 'vue'
import { useWindowSize } from '@vueuse/core'

const props = defineProps({
  pageCount: {
    type: Number,
    default: 0
  }
})
// 是否支持touch事件
const isTouch = ref('ontouchstart' in document.documentElement)
const fullpage = ref()
// ELEMENT
const element = ref()
const height = ref(0)
watchEffect(() => {
  if (fullpage.value) {
    height.value = fullpage.value.clientHeight
  }
  if (element.value) {
    element.value.style.transform = transformScroll.value
  }
})

//HEIGHT
const rect = useWindowSize()
watch(rect.height, () => {
  // 高度变化时需要关闭动画
  isTranstion.value = true
  height.value = fullpage.value.clientHeight
})
const transformScroll = computed(() => {
  return `translateY(-${$index.value * height.value}px)`
})

// ISTRANSTION  CANRUN
const isTranstion = ref(false) //控制是否显示动画效果
const canRun = ref(true) //节流控制器

interface RefData {
  x: number
  y: number
  deltaY: number
}
// 参考数据
const refData: RefData = {
  x: 0,
  y: 0,
  deltaY: 0
}

function handleWheel(event: WheelEvent) {
  if (isTouch.value) return
  // 滚轮事件，deltaY < 0 是向上，deltaY > 0 是向下
  refData.deltaY = event.deltaY
  handlePageScroll()
}

function handlePageScroll() {
  isTranstion.value = false
  if (canRun.value) {
    canRun.value = false
    if (refData.deltaY > 0) {
      next()
    } else if (refData.deltaY < 0) {
      last()
    }
    setTimeout(() => {
      canRun.value = true
    }, 1200)
  }
}

function handleTouchStart(event: TouchEvent) {
  const touch = event.touches[0]
  refData.x = touch.pageX
  refData.y = touch.pageY
}

function handleTouchMove(event: TouchEvent) {
  const touch = event.touches[0]
  // 与滚轮事件保持一致算法
  refData.deltaY = refData.y - touch.pageY
}

function handleTouchEnd() {
  handlePageScroll()
}

//$INDEX
const $index = ref(0) //索引控制第几个显示
// 下一个
function next() {
  if ($index.value < props.pageCount - 1) {
    $index.value++
  }
}
// 上一个
function last() {
  if ($index.value >= 1) {
    $index.value--
  }
}

// 点击切换
function handleChangePage(index: number) {
  // 点击切换时需要开启动画
  isTranstion.value = false
  $index.value = index
}
</script>
<style lang="scss" scoped>
.activeTranstion {
  transition: all 0ms ease 0s !important;
}

.fullpage-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;

  &.fullpage-transtion {
    transition: all 0ms ease 0s !important;
  }
  .fullpage-active {
    width: 12px !important;
    height: 12px !important;
  }
  .fullpage-inner-box {
    width: 100%;
    height: 100%;
    transition: all ease-in-out 1s;
    & > * {
      width: 100%;
      height: 100%;
    }
  }
  .fullpage-aside {
    position: absolute;
    right: 20px;
    top: 50%;
    z-index: 1;
    transform: translateY(-50%);
    li {
      height: 14px;
      width: 14px;
      margin: 7px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      span {
        border-radius: 100%;
        border: #fff solid 1px;
        width: 4px;
        height: 4px;
        display: inline-block;
        background-color: #fff;
        transition: all ease-in-out 0.2s;
      }
      &:hover span {
        width: 10px;
        height: 10px;
        background-color: #fff;
        cursor: pointer;
      }
    }
  }
}
</style>
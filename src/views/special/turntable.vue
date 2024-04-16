<template>
  <PageLayout :fullpage="false">
    <div class="turntable-title">幸运大转盘</div>
    <div class="turntable-wrap flex-center">
      <div class="turntable-content" :style="tStyle">
        <div
          v-for="item in list"
          :key="item.id"
          class="turntable-item"
          :style="item.style"
        ></div>
        <div
          v-for="item in list"
          :key="item.id"
          class="turntable-text"
          :style="item.childStyle"
        >
          {{ item.award }}
        </div>
      </div>
      <div class="turntable-btn">
        <span class="flex-center" @click="handleDraw">抽奖</span>
      </div>
    </div>
  </PageLayout>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import PageLayout from '@/components/page/layout.vue'
import { delay } from '@/utils/util'
const list = ref<any[]>([])
const tStyle = ref('')
const isDraw = ref(false)
const current = ref(-1)

function handleInit() {
  const awards = [
    {
      id: 0,
      award: '谢谢参与',
      weight: 61.67
    },
    {
      id: 1,
      award: '1元',
      weight: 20
    },
    {
      id: 2,
      award: '2元',
      weight: 10
    },
    {
      id: 3,
      award: '5元',
      weight: 5
    },
    {
      id: 4,
      award: '10元',
      weight: 2
    },
    {
      id: 5,
      award: '电动牙刷',
      weight: 1
    },
    {
      id: 6,
      award: '笔记本电脑',
      weight: 0.2
    },
    {
      id: 7,
      award: '苹果手机',
      weight: 0.1
    },
    {
      id: 8,
      award: '小米汽车',
      weight: 0.02
    },
    {
      id: 9,
      award: '100万',
      weight: 0.01
    }
  ]
  const part = 360 / awards.length
  let min = 0
  let max = 0
  awards.forEach((item, i) => {
    const bg = i % 2 > 0 ? 'background-color: #fecb6c;' : ''
    max += item.weight * 100
    list.value.push({
      ...item,
      min,
      max,
      style: `transform: rotate(${i * part - part / 2}deg) skewY(${
        part - 90
      }deg);${bg}`,
      childStyle: `transform: rotate(${i * part + 90}deg) translateY(-50%);`
    })
    min = max
  })
}
handleInit()

/**
 * 执行绘制操作，模拟一个随机数抽奖过程。
 * 该函数首先随机决定一个延迟时间，然后生成一个随机的四个数字数组，并将这些数字进行排序和重新组合，
 * 最后使用这个组合的数字去匹配一个预定义的列表，找到匹配的项并更新当前选中项。
 * 该函数没有参数和返回值，因为它直接操作和修改组件的内部状态。
 */
async function execDraw() {
  // 随机生成延迟时间（1-5秒）
  const count = Math.floor(Math.random() * 5) + 1
  await delay(count * 1000) // 等待随机时间

  // 生成一个包含4个0-9之间随机数的数组
  const arr: number[] = []
  for (let i = 0; i < 4; i++) {
    arr.push(Math.floor(Math.random() * 10))
  }

  // 计算数组元素总和，考虑每个数字的权重（位置）
  let total = 0
  arr
    .sort(() => {
      return Math.floor(Math.random() * 10) - 7 // 使用随机方式排序数组
    })
    .forEach((item, i) => {
      total += item * Math.pow(10, i) // 计算总和
    })

  // 在预定义的列表中查找匹配的项，并更新当前选中项
  list.value.some((item, index) => {
    if (item.min <= total && total <= item.max) {
      current.value = index // 找到匹配项，更新当前选中项
      return true
    }
  })

  // 如果没有找到匹配项，则将当前选中项重置为0
  if (current.value < 0) {
    current.value = 0
  }
}
async function drawEnd(count = 1) {
  const x = 5
  const part = 360 / list.value.length
  let long = 1000
  let rotate = count * x * 360
  let str = ``
  if (current.value > -1) {
    long += current.value * 200 + 1000
    rotate += (10 - current.value) * part
    str += `transition: transform ${long}ms cubic-bezier(0, 1, 0, 0.98);`
    setTimeout(() => {
      console.log(list.value[current.value], '======中奖信息')
      if (current.value === 0) {
        ElMessage('很遗憾未中奖')
      } else {
        ElMessage.success('恭喜你中奖了')
      }
      isDraw.value = false
      tStyle.value = `transform: rotate(${(10 - current.value) * part}deg)`
      current.value = -1
    }, long)
  } else {
    str += `transition: transform ${long}ms linear;`
    setTimeout(() => {
      drawEnd(count + 1)
    }, long)
  }
  str += `transform: rotate(${rotate}deg);`
  tStyle.value = str
}
async function handleDraw() {
  if (isDraw.value) return
  isDraw.value = true
  drawEnd(1)
  execDraw()
}
</script>
<style lang="scss" scoped>
.turntable-wrap {
  margin: 0 auto;
  position: relative;
  width: 610px;
  height: 610px;
  border-radius: 50%;
  border: 12px solid #9dd4fa;
}
.turntable-title {
  padding: 16px 0 32px;
  text-align: center;
  font-size: 44px;
  font-weight: bold;
  color: #ee5353;
}
.turntable-content {
  position: relative;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  border: 8px solid #692781;
  overflow: hidden;
  .turntable-item {
    position: absolute;
    left: 50%;
    top: -50%;
    width: 100%;
    height: 100%;
    background-color: #fef1c5;
    /*以正方形左下角为中心旋转，0% 100%即左下角的坐标*/
    transform-origin: 0% 100%;
  }
  .turntable-text {
    position: absolute;
    top: 50%;
    left: 0;
    width: 50%;
    text-indent: 36px;
    font-size: 24px;
    font-weight: bold;
    transform-origin: 100% 0;
  }
}
.turntable-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 68px;
  height: 68px;
  background-color: #ee5353;
  border-radius: 50%;
  span {
    position: relative;
    z-index: 1;
    width: 68px;
    height: 68px;
    font-size: 20px;
    letter-spacing: 3px;
    font-weight: bold;
    color: #fff;
    cursor: pointer;
  }
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -90%);
    border: 16px solid transparent;
    border-bottom: 80px solid #ee5353;
  }
}
</style>

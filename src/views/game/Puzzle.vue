<template>
  <PageLayout>
    <div class="game-wrap">
      <h3>拼图游戏</h3>
      <div class="desc">轻松时刻，拼图小游戏</div>
      <section class="game-box flex-center">
        <div class="game-content">
          <div
            v-if="gameInfo.isStart && gameInfo.countDown > 0"
            class="game-count-down flex-center"
          >
            {{ gameInfo.countDown }}
          </div>
          <ul
            :key="gameInfo.id"
            @mousedown="handleMouseDown"
            @mousemove="handleMouseMove"
            @mouseup="handleMouseUp"
            @mouseleave="handleMouseUp"
          >
            <li
              v-for="(item, index) in cellList"
              :key="item.index"
              :class="'item-' + item.index"
              :data-index="index"
            ></li>
          </ul>
        </div>
        <div class="game-info">
          <div class="game-title">拼图游戏</div>
          <div class="game-btn flex-center-space-around">
            <p @click="handleStartGame">开始游戏</p>
            <p>重置游戏</p>
          </div>
          <div class="game-title">上次成绩</div>
          <div class="take-time">
            {{ gameInfo.useTime ? `用时${gameInfo.useTime}` : '--' }}
          </div>
          <div class="game-title">成绩列表</div>
          <ul class="game-score-info">
            <li
              v-for="(item, index) in scoreList"
              :key="index"
              :class="{ 'best-lap': index < 3 }"
            >
              <label class="flex-center">{{ index + 1 }}</label>
              <span>用时{{ item }}</span>
              <SvgIcon v-if="index < 3" name="hot-for-atmosphere"></SvgIcon>
            </li>
          </ul>
        </div>
      </section>
    </div>
  </PageLayout>
</template>
<script setup lang="ts">
import { reactive, ref, onUnmounted } from 'vue'
import { ElMessage } from 'element-plus'
import PageLayout from '@/components/page/layout.vue'
import SvgIcon from '@/components/svg-icon.vue'

// 格子数据
interface Cell {
  index: number
  position: number
}
// 方向定义
type Direction = 'left' | 'top' | 'right' | 'bottom'
// 参考数据
interface RefData {
  isStart: boolean // 移动是否开始
  x: number // 坐标x
  y: number // 坐标y
  index: number // 当前点击格子的下标
  offsetLeft: number // 当前格子的 offsetLeft
  offsetTop: number // 当前格子的 offsetTop
  top: number // 当前格子的top上限
  bottom: number // 当前格子的bottom上限
  left: number // 当前格子的left上限
  right: number // 当前格子的left上限
  el?: HTMLLIElement // 当前格子的Element元素
  type: '' | Direction // 移动方向
  isEnd: boolean // 上次移动是否结束
}

interface GameInfo {
  id: number
  isStart: boolean
  timestamp: number
  useTime: string
  countDown: number
  timer: null | ReturnType<typeof setTimeout>
}

// 格子列表
const cellList = ref<Cell[]>([])
const refData: RefData = {
  isStart: false,
  x: 0,
  y: 0,
  index: 0,
  offsetLeft: 0,
  offsetTop: 0,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  el: undefined,
  type: '',
  isEnd: true
}
// 空格子所在位置下标
let emptyCell = 8
// 游戏数据
const gameInfo: GameInfo = reactive({
  id: 0,
  isStart: false,
  timestamp: 0,
  useTime: '',
  countDown: 0,
  timer: null
})
// 游戏成绩
const scoreList = ref<string[]>([])
// 初始化游戏
function handleInitGame() {
  const arr: Cell[] = []
  for (let i = 1; i < 9; i++) {
    arr.push({
      index: i,
      position: i - 1
    })
  }
  cellList.value = arr
}
handleInitGame()
// 构建格子数据，对图片进行打乱
function handleStartGame() {
  if (gameInfo.isStart) {
    ElMessage('游戏已开始!')
    return
  }
  gameInfo.id++
  gameInfo.isStart = true
  gameInfo.countDown = 3
  emptyCell = 8
  handleGameCountDown()
  const arr: Cell[] = new Array(8)
  const refArr = [1, 2, 3, 4, 5, 6, 7, 8]
  while (refArr.length) {
    const len = refArr.length
    const index = Math.floor(Math.random() * (len + 1))
    if (len === 8 || Math.abs(arr[8 - len - 1].index - refArr[index]) !== 1) {
      arr[8 - len] = {
        index: refArr[index],
        position: 8 - len
      }
      refArr.splice(index, 1)
    }
  }
  cellList.value = arr
}
// 页面卸载
onUnmounted(() => {
  if (gameInfo.timer) {
    clearTimeout(gameInfo.timer)
    gameInfo.timer = null
  }
})
// 处理游戏开始倒计时
function handleGameCountDown() {
  gameInfo.timer = setTimeout(() => {
    gameInfo.countDown -= 1
    if (gameInfo.countDown > 0) {
      handleGameCountDown()
    } else {
      gameInfo.timestamp = Date.now()
    }
  }, 1000)
}
// 鼠标按下事件
function handleMouseDown(event: MouseEvent) {
  const el = event.target as HTMLLIElement
  if (!gameInfo.isStart) {
    return ElMessage('请点击开始游戏')
  }
  // 未开始游戏 或 上次移动未结束 或 未点击到格子，则不做任何处理
  if (!refData.isEnd || el.tagName.toLocaleLowerCase() !== 'li') return
  // 获取当前格子在地图中的下标位置
  const index = Number(el.getAttribute('data-index'))
  const position = cellList.value[index].position
  refData.isStart = true
  refData.el = el
  refData.x = event.pageX
  refData.y = event.pageY
  refData.index = index
  refData.offsetTop = Math.floor(position / 3) * 200
  refData.offsetLeft = (position % 3) * 200
  refData.top = refData.offsetTop
  refData.left = refData.offsetLeft
  refData.right = refData.left
  refData.bottom = refData.top
  refData.type = ''
  const distance = emptyCell - position
  const dMap: Record<string, Direction> = {
    3: 'bottom',
    '-3': 'top',
    1: 'right',
    '-1': 'left'
  }
  // 根据方向，设置移动边界
  if (dMap[distance]) {
    refData.type = dMap[distance]
    refData[dMap[distance]] += (distance > 0 ? 1 : -1) * 200
  }
}
// 鼠标移动事件
function handleMouseMove(event: MouseEvent) {
  // 未开始 或 上次滑动未结束，则终止运行
  if (!gameInfo.isStart || !refData.isStart || !refData.isEnd) return
  const el = refData.el as HTMLLIElement
  const vd = event.pageY - refData.y
  const hd = event.pageX - refData.x
  // 根据可移动方向，计算真实移动方向
  let direction: '' | Direction = ''
  if (vd !== 0 && (refData.type === 'top' || refData.type === 'bottom')) {
    direction = vd > 0 ? 'bottom' : 'top'
  }
  if (hd !== 0 && (refData.type === 'left' || refData.type === 'right')) {
    direction = hd > 0 ? 'right' : 'left'
  }
  switch (direction) {
    case 'top':
    case 'bottom':
      if (refData.offsetTop + vd <= refData.top) {
        el.style.top = refData.top + 'px'
      } else if (refData.offsetTop + vd >= refData.bottom) {
        el.style.top = refData.bottom + 'px'
      } else {
        el.style.top = refData.offsetTop + vd + 'px'
      }
      break
    case 'left':
    case 'right':
      if (refData.offsetLeft + hd <= refData.left) {
        el.style.left = refData.left + 'px'
      } else if (refData.offsetLeft + hd >= refData.right) {
        el.style.left = refData.right + 'px'
      } else {
        el.style.left = refData.offsetLeft + hd + 'px'
      }
      break
  }
}
function handleMouseUp() {
  refData.isStart = false
  const el = refData.el
  // 游戏未开始 或 无Element元素 或 无方向 或 上次滑动未结束，则终止运行
  if (!gameInfo.isStart || !el || !refData.type || !refData.isEnd) {
    return
  }
  handleAnimation(el)
  const position = cellList.value[refData.index].position
  switch (refData.type) {
    case 'top':
      if (el.offsetTop - refData.top > 140) {
        el.style.top = refData.top + 200 + 'px'
      } else {
        el.style.top = refData.top + 'px'
        cellList.value[refData.index].position = emptyCell
        emptyCell = position
      }
      break
    case 'bottom':
      if (refData.bottom - el.offsetTop > 140) {
        el.style.top = refData.bottom - 200 + 'px'
      } else {
        el.style.top = refData.bottom + 'px'
        cellList.value[refData.index].position = emptyCell
        emptyCell = position
      }
      break
    case 'left':
      if (el.offsetLeft - refData.left > 140) {
        el.style.left = refData.left + 200 + 'px'
      } else {
        el.style.left = refData.left + 'px'
        cellList.value[refData.index].position = emptyCell
        emptyCell = position
      }
      break
    case 'right':
      if (refData.right - el.offsetLeft > 140) {
        el.style.left = refData.right - 200 + 'px'
      } else {
        el.style.left = refData.right + 'px'
        cellList.value[refData.index].position = emptyCell
        emptyCell = position
      }
      break
  }
  checkGameStatus()
  refData.type = ''
}
// 检查游戏状态，判断是否完成
function checkGameStatus() {
  const arr = new Array(8).fill(0)
  cellList.value.forEach(item => {
    arr[item.index - 1] = item.position
  })
  if (arr.join('') === '01234567') {
    ElMessage.success('拼接成功，好棒哦！')
    gameInfo.isStart = false
    let long = Math.ceil((Date.now() - gameInfo.timestamp) / 1000)
    if (long > 3600) {
      gameInfo.useTime = Math.floor(long / 3600) + '小时'
      long = long % 3600
    }
    if (long > 60) {
      gameInfo.useTime += Math.floor(long / 60) + '分种'
      long = long % 60
    }
    if (long > 0) {
      gameInfo.useTime += long + '秒'
    }
    scoreList.value.push(gameInfo.useTime)
  }
}
function handleAnimation(el: HTMLLIElement) {
  refData.isEnd = false
  el.style.transition = '0.3s all'
  setTimeout(() => {
    refData.isEnd = true
    el.style.transition = ''
  }, 320)
}
</script>
<style lang="scss" scoped>
.game-wrap {
  margin: 0 auto;
  padding: 16px;
  max-width: 1200px;
  text-align: center;
  line-height: 24px;
  h3 {
    line-height: 34px;
    font-weight: bold;
  }
  .desc {
    font-size: 14px;
    color: #999;
  }
}
.game-box {
  margin: 16px auto;
}
.game-content {
  position: relative;
  width: 600px;
  height: 600px;
  border: 1px solid #ddd;
  .game-count-down {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    font-size: 36px;
    color: #fff;
  }
  ul {
    width: 100%;
    height: 100%;
  }
  li {
    position: absolute;
    top: 0;
    left: 0;
    width: 200px;
    height: 200px;
    background: url(@/assets/images/img-01.jpg) no-repeat;
    box-shadow: inset 0 0 3px #fff;
    cursor: pointer;
  }

  li:nth-child(2) {
    left: 200px;
  }
  li:nth-child(3) {
    left: 400px;
  }
  li:nth-child(4) {
    top: 200px;
  }
  li:nth-child(5) {
    top: 200px;
    left: 200px;
  }
  li:nth-child(6) {
    top: 200px;
    left: 400px;
  }
  li:nth-child(7) {
    top: 400px;
  }
  li:nth-child(8) {
    top: 400px;
    left: 200px;
  }

  .item-1 {
    background-position: 0 0;
  }

  .item-2 {
    background-position: -200px 0;
  }

  .item-3 {
    background-position: -400px 0;
  }

  .item-4 {
    background-position: 0 -200px;
  }

  .item-5 {
    background-position: -200px -200px;
  }

  .item-6 {
    background-position: -400px -200px;
  }

  .item-7 {
    background-position: 0 -400px;
  }

  .item-8 {
    background-position: -200px -400px;
  }
}
.game-info {
  margin-left: 16px;
  width: 200px;
  height: 600px;
  text-align: left;
  border: 1px solid #ddd;
}
.game-title {
  padding: 0 12px;
  line-height: 36px;
  background-color: #f1f1f1;
}
.game-btn {
  padding: 16px 10px;
  p {
    padding: 3px 8px;
    background-color: #666;
    border-radius: 8px;
    font-size: 15px;
    color: #fff;
    cursor: pointer;
    user-select: none;
  }
}
.take-time {
  line-height: 36px;
  text-align: center;
  font-size: 15px;
  color: #ee5353;
}
.game-score-info {
  padding: 12px;
  height: 380px;
  line-height: 24px;
  font-size: 15px;
  overflow-y: auto;
  box-sizing: border-box;
  li + li {
    margin-top: 12px;
  }
  label {
    display: inline-flex;
    margin-right: 8px;
    width: 24px;
    height: 18px;
    background-color: #ddd;
    border-radius: 2px;
  }
}
.best-lap {
  label {
    background-color: #ee5353;
    color: #fff;
  }
  svg {
    margin-left: 4px;
    font-size: 18px;
    color: #ee5353;
  }
}
</style>

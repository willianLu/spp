<template>
  <PageLayout :fullpage="false">
    <div class="line-wrap">
      <h3>制作线盒</h3>
      <div class="desc">标尺制作盒子，算法计算</div>
      <ul
        ref="box"
        class="line-box"
        @mousedown="handleMouseDown"
        @contextmenu="handleContextMenu"
        @mousemove="handleMouseMove"
        @mouseleave="handleMouseLeave"
      >
        <li
          v-for="(item, index) in list"
          :key="item.id"
          :class="[`type-${item.type}`]"
          :style="{
            top: item.top + 'px',
            left: item.left + 'px',
            width: item.width + 'px',
            height: item.height + 'px'
          }"
          @mousedown.stop="handleLineMouseDown($event, index)"
          @mouseup="handleLineMouseup"
        ></li>
      </ul>
    </div>
  </PageLayout>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import PageLayout from '@/components/page/layout.vue'
const count = ref(0)
const list = ref<any>([])
const box = ref<HTMLDivElement>()
const refData = {
  index: -1,
  x: 0,
  y: 0,
  top: 0,
  left: 0
}
function handleMouseDown(event: MouseEvent) {
  count.value += 1
  if (event.button === 0) {
    list.value.push({
      id: count.value,
      type: 'h',
      top: event.offsetY,
      left: 0,
      width: box.value?.clientWidth,
      height: 1
    })
  } else if (event.button === 2) {
    list.value.push({
      id: count.value,
      type: 'v',
      top: 0,
      left: event.offsetX,
      width: 1,
      height: box.value?.clientHeight
    })
  }
}
function handleContextMenu(event: Event) {
  event.preventDefault()
}
function handleLineMouseDown(event: MouseEvent, index: number) {
  const item = list.value[index]
  refData.index = index
  refData.x = event.pageX
  refData.y = event.pageY
  refData.top = item.top
  refData.left = item.left
}
function handleMouseMove(event: MouseEvent) {
  if (refData.index === -1) return
  const item = list.value[refData.index]
  if (item.type === 'h') {
    item.top = refData.top + event.pageY - refData.y
  } else if (item.type === 'v') {
    item.left = refData.left + event.pageX - refData.x
  }
}
function handleLineMouseup() {
  //
  refData.index = -1
}
function handleMouseLeave() {
  if (refData.index === -1) return
  list.value.splice(refData.index, 1)
  refData.index = -1
}
</script>
<style lang="scss" scoped>
.line-wrap {
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
.line-box {
  margin: 16px auto;
  position: relative;
  width: 680px;
  height: 510px;
  border: 1px solid #ddd;
  overflow: hidden;
  li {
    position: absolute;
    background-color: #ee5353;
  }
  .type-h:hover {
    cursor: row-resize;
  }
  .type-v:hover {
    cursor: col-resize;
  }
}
</style>

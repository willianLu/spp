<template>
  <PageLayout>
    <ul ref="box" class="waterfall-wrap">
      <li v-for="(item, index) in list" :key="index">
        <div class="img-item" :class="item.type">
          <img :src="Img1" />
        </div>
        <div class="desc">{{ item.desc }}</div>
      </li>
    </ul>
  </PageLayout>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import PageLayout from '@/components/page/layout.vue'
import Img1 from '@/assets/images/img-01.jpg'
// 浏览器原生支持，利用img标签的loading属性实现懒加载
const list: any = []
function handleInit() {
  const types = ['large', 'middle', 'samll']
  const descs = [
    '简而言之，虚拟列表指的就是「可视区域渲染」的列表。',
    '一般情况下，滚动容器元素是 window 对象。然而，我们可以通过布局的方式，在某个页面中任意指定一个或者多个滚动容器元素。',
    '滚动容器元素的内部内容区域。假设有 100 条数据，每个列表项的高度是 50，那么可滚动的区域的高度就是 100 * 50。可滚动区域当前的具体高度值一般可以通过(滚动容器)元素的 scrollHeight 属性获取。'
  ]
  for (let i = 0; i < 50; i++) {
    list.push({
      type: types[Math.floor(Math.random() * 30) % 3],
      desc: descs[Math.floor(Math.random() * 30) % 3]
    })
  }
}
handleInit()
const box = ref()
onMounted(() => {
  if (box.value) {
    for (let i = 0; i < box.value.children.length; i++) {
      const item = box.value.children[i]
      const rows = Math.ceil(item.clientHeight / 5) + 2
      item.style.gridRowEnd = `span ${rows}`
    }
  }
})
</script>
<style lang="scss" scoped>
.waterfall-wrap {
  padding: 16px;
  margin: 0 auto;
  max-width: 1200px;
  display: grid;
  grid-template-columns: repeat(auto-fit, 180px);
  column-gap: 10px;
  grid-auto-rows: 5px;
  align-items: start;
  justify-content: space-between;
  li {
    padding: 12px 10px;
    width: 100%;
    border: 1px solid #ddd;
    box-sizing: border-box;
    .img-item {
      width: 100%;
      overflow: hidden;
    }
    .samll {
      height: 50px;
    }
    .middle {
      height: 100px;
    }
    .large {
      height: 150px;
    }
    img {
      width: 100%;
      height: 100%;
    }
    .desc {
      margin-top: 12px;
      line-height: 20px;
      font-size: 14px;
    }
  }
}
</style>

<template>
  <PageLayout :fullpage="false">
    <div class="icon-container">
      <div v-for="(item, index) in list" :key="index" class="item">
        <SvgIcon :name="item" />
        <div class="name">
          {{ item }}
        </div>
      </div>
    </div>
  </PageLayout>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import PageLayout from '@/components/page/layout.vue'
import SvgIcon from '@/components/svg-icon.vue'
// svg文件名集合
const list = ref<string[]>([])
// 解析svg文件名称
const modules = import.meta.glob('@/icons/*.svg')
Object.keys(modules).forEach((key: string) => {
  const name = key.match(/.*\/(.+)\.svg$/)
  if (name !== null) {
    list.value.push(name[1])
  }
})
</script>
<style lang="scss" scoped>
.icon-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  grid-auto-rows: 100px;
  grid-gap: 10px;
  font-size: 48px;
  color: #ee5353;
  .item {
    text-align: center;
    cursor: pointer;
    .name {
      font-size: 16px;
      padding-top: 15px;
      color: #030303;
    }
  }
}
</style>

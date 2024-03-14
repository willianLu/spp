<template>
  <PageLayout>
    <div class="img-lazy">
      <div v-for="item in 10" :key="item" class="flex-center">
        <!-- 利用img标签的loading属性实现懒加载 -->
        <img :src="Img1 + '?t=' + item" loading="lazy" />
      </div>
    </div>
  </PageLayout>
</template>
<script setup lang="ts">
import PageLayout from '@/components/page/layout.vue'
import Img1 from '@/assets/images/img-01.jpg'
// 浏览器原生支持，利用img标签的loading属性实现懒加载
</script>
<style lang="scss" scoped>
.img-lazy {
  padding: 16px 0;
  div {
    margin: 32px auto;
    width: 600px;
    height: 600px;
    img {
      width: 600px;
      height: 600px;
    }
  }
}
</style>

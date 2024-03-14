<template>
  <PageContainer>
    <PageHeader></PageHeader>
    <!-- 最外层容器 -->
    <Fullpage :page-count="ysImage.length">
      <!-- 内层容器 -->
      <div
        v-for="(item, index) in ysImage"
        :key="index"
        :style="{ backgroundImage: `url(${item.backgroundImage})` }"
        class="scroll-element"
      ></div>
    </Fullpage>
  </PageContainer>
</template>
<script setup lang="ts">
import { ref, watchEffect, watch, computed } from 'vue'
import { useWindowSize } from '@vueuse/core'
import PageContainer from '@/components/page/container.vue'
import PageHeader from '@/components/page/header.vue'
import Fullpage from '@/components/fullpage/index.vue'
// IMAGE DATA
const ysImage = ref([
  {
    backgroundImage:
      'https://uploadstatic.mihoyo.com/contentweb/20200319/2020031921550320292.jpg'
  },
  {
    backgroundImage:
      'https://uploadstatic.mihoyo.com/contentweb/20200319/2020031921552395638.jpg'
  },
  {
    backgroundImage:
      'https://uploadstatic.mihoyo.com/contentweb/20210719/2021071918001232800.jpg'
  },
  {
    backgroundImage:
      'https://webstatic.mihoyo.com/upload/contentweb/2022/08/15/8969f683b92839ac427c875d0d742be2_4825576482548821743.jpg'
  }
])
</script>
<style lang="scss" scoped>
.scroll-element {
  height: 100%;
  background-size: cover !important;
  background-position: center;
  background-repeat: no-repeat;
}
</style>

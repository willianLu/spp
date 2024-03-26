<template>
  <PageContainer>
    <PageHeader></PageHeader>
    <PageMain ref="main" @scroll="$emit('scroll', $event)">
      <div
        class="page-main-content"
        :class="{
          'page-fullpage': fullpage
        }"
      >
        <div>
          <slot></slot>
        </div>
      </div>
      <PageFooter></PageFooter>
    </PageMain>
  </PageContainer>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import PageContainer from './container.vue'
import PageHeader from './header.vue'
import PageMain from './main.vue'
import PageFooter from './footer.vue'

defineProps({
  fullpage: {
    type: Boolean,
    default: true
  }
})
defineEmits(['scroll'])
const main = ref()

interface ScrollOptions {
  left: number
  top: number
  behavior?: string
}
function scrollTo(options: ScrollOptions) {
  main.value.$el.scrollTo(options)
}
defineExpose({
  scrollTo
})
</script>
<style lang="scss" scoped>
.page-main-content {
  position: relative;
  background-color: var(--main-background);
  &:not(.page-fullpage) > div {
    margin: 0 auto;
    padding: 16px 0;
    width: 100%;
    max-width: 1080px;
  }
}
</style>

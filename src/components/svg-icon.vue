<template>
  <component :is="name" class="svg-icon" />
</template>
<script lang="ts">
import { Component } from 'vue'
// svg模块
const modules = import.meta.glob('@/icons/*.svg', { eager: true })

// 将资源文件转换成组件
const components: Record<string, Component> = {}
Object.keys(modules).forEach((key: string) => {
  const name = key.match(/.*\/(.+)\.svg$/)
  if (name !== null) {
    components[name[1]] = (modules[key] as Record<'default', Component>).default
  }
})

export default {
  name: 'SvgIcon',
  components,
  props: {
    name: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>

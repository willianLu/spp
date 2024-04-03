<template>
  <RouterView v-slot="{ Component }">
    <component :is="Component"></component>
  </RouterView>
</template>
<script setup lang="ts">
import useHomeStore from '@/store/index'

const homeStore = useHomeStore()
homeStore.getLocationData()
</script>
<style>
#app {
  width: 100%;
  height: 100%;
}
</style>

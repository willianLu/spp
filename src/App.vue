<template>
  <RouterView v-slot="{ Component }">
    <component :is="Component"></component>
  </RouterView>
</template>
<script setup lang="ts">
//
</script>
<style>
#app {
  width: 100%;
  height: 100%;
}
</style>

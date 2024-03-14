<template>
  <main class="page-container">
    <slot></slot>
  </main>
</template>
<script setup lang="ts">
//
</script>
<style lang="scss" scoped>
.page-container {
  display: grid;
  grid-template-rows: auto 1fr;
  width: 100%;
  height: 100%;
}
</style>

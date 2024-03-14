<template>
  <section class="page-main">
    <slot></slot>
  </section>
</template>
<style lang="scss" scoped>
.page-main {
  display: grid;
  grid-template-rows: 1fr auto;
  overflow-y: auto;
}
</style>

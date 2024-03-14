<template>
  <PageContainer>
    <PageHeader></PageHeader>
    <PageMain>
      <section>
        <slot></slot>
      </section>
      <PageFooter></PageFooter>
    </PageMain>
  </PageContainer>
</template>
<script setup lang="ts">
import PageContainer from './container.vue'
import PageHeader from './header.vue'
import PageMain from './main.vue'
import PageFooter from './footer.vue'
</script>

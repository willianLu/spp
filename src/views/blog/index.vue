<template>
  <PageLayout>
    <section class="blog-wrap">
      <ul>
        <li
          v-for="item in BlogData"
          :key="item.key"
          @click="checkBlog(item.key)"
        >
          <div>{{ item.title }}</div>
          <div v-if="item.desc">{{ item.desc }}</div>
          <div>{{ item.date }}</div>
        </li>
      </ul>
    </section>
  </PageLayout>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import PageLayout from '@/components/page/layout.vue'
import { BlogData } from '@/blogs/index'
const router = useRouter()

function checkBlog(key: number) {
  router.push({
    path: '/blog/' + key
  })
}
</script>
<style lang="scss" scoped>
.blog-wrap {
}
</style>

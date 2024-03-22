<template>
  <PageLayout>
    <component :is="name" />
  </PageLayout>
</template>
<script lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import PageLayout from '@/components/page/layout.vue'
import 'github-markdown-css'
import { stringToId } from '@/utils/util'

const BlogComponents: any = {
  PageLayout
}
const modules = import.meta.glob('../../blogs/**/*.md', { eager: true })
Object.keys(modules).forEach((key: string) => {
  const item = modules[key] as any
  if (item) {
    // eslint-disable-next-line no-useless-escape
    BlogComponents[
      'Blog-' + stringToId(key.replace(/(\.\.\/)|(blogs\/)|(\.md$)/g, ''))
    ] = item.default
  }
})
export default {
  components: BlogComponents,
  setup() {
    const route = useRoute()
    const name = ref('Blog-' + route.params.id)
    return {
      name
    }
  }
}
</script>

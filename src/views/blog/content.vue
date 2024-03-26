<template>
  <PageLayout
    ref="layout"
    class="page-blog-wrap"
    :fullpage="false"
    @scroll="handleScroll"
  >
    <div ref="blog" class="page-blog-container">
      <component :is="componentName" />
      <ul class="page-blog-right">
        <li class="blog-catalog">
          <div class="blog-title">目录</div>
          <ul class="catalog-wrap">
            <li
              v-for="(item, index) in list"
              :key="index"
              :class="[
                'catalog-item-' + item.type,
                { active: current === index }
              ]"
              @click="handleCheckCatalog(index)"
            >
              {{ item.name }}
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </PageLayout>
</template>
<script lang="ts">
import { ref, onMounted, type Component } from 'vue'
import { useRoute } from 'vue-router'
import PageLayout from '@/components/page/layout.vue'
import 'github-markdown-css'
import { stringToId } from '@/utils/util'
import { throttle } from 'lodash-es'

const BlogComponents: Record<string, Component> = {
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

/**
 * 标题单元数据
 * @field id 为标题设置的id
 * @field tag 标题的标签
 * @field type 标题层级 1 - 3
 * @field name 标题名称
 */
interface CatalogItem {
  id: string
  tag: string
  type: number
  name: string
}

export default {
  components: BlogComponents,
  setup() {
    const route = useRoute()
    const componentName = ref('Blog-' + route.params.id)
    const list = ref<CatalogItem[]>([])
    const current = ref(-1)
    const layout = ref()
    const blog = ref()
    // 记录点击目录，此时手动触发页面滚动，滚动函数不执行任何操作
    let catalogTimer: ReturnType<typeof setTimeout> | null = null
    onMounted(() => {
      handleParseCatalog()
    })
    // 解析文档目录信息
    function handleParseCatalog() {
      const mk = (blog.value as Element).querySelector('.markdown-body')
      if (!mk) return
      const cArr: CatalogItem[] = []
      const res = mk.getElementsByTagName('*')
      // 标题标签权重映射
      const hMap: Record<string, number> = {
        h1: 5,
        h2: 4,
        h3: 3,
        h4: 2,
        h5: 1
      }
      // 目录设计最大为三层，记录当前层次的标题权重
      const rMap: Record<number, number> = {
        1: 0,
        2: 0,
        3: 0
      }
      // 默认第一个标题为页面标题，不做目录使用
      let isPageTitle = true
      for (let i = 0; i < res.length; i++) {
        const tag = res[i].tagName.toLowerCase()
        const name = res[i].textContent
        // 非标题标签 或者 不存在标题名称 或者 页面标题，则跳过处理
        if (!hMap[tag] || !name || isPageTitle) {
          if (isPageTitle) isPageTitle = false
          continue
        }
        const item: CatalogItem = {
          id: tag + '-' + cArr.length,
          tag,
          type: 0,
          name: name || ''
        }
        // 未设置一级标题 或者 当前标题权重大于等于1级标题
        if (!rMap[1] || rMap[1] <= hMap[tag]) {
          rMap[1] = hMap[tag]
          item.type = 1
        } else if (!rMap[2] || rMap[2] <= hMap[tag]) {
          rMap[2] = hMap[tag]
          item.type = 2
        } else if (!rMap[3] || rMap[3] <= hMap[tag]) {
          rMap[3] = hMap[tag]
          item.type = 3
        }
        if (item.type) {
          ;(res[i] as HTMLElement).setAttribute('data-h', item.id)
          cArr.push(item)
        }
      }
      list.value = cArr
    }
    // 对滚动事件截流处理
    const handleScroll = throttle(function (event: Event) {
      // 目录点击未处理完时，不做任何处理
      if (catalogTimer) return
      const el = event.target as HTMLDivElement
      let idx = list.value.length - 1
      list.value.some((item, index) => {
        const hEl = document.querySelector(
          `[data-h='${item.id}']`
        ) as HTMLElement
        let pre = el.scrollTop
        if (index) {
          const pEl = document.querySelector(
            `[data-h='${list.value[index - 1].id}']`
          ) as HTMLElement
          pre = pEl.offsetTop
        }
        // 当scrollTop值 小于 前一个标题到当前标题一半的位置时，标题定格在前一个标题
        if (el.scrollTop < hEl.offsetTop - (hEl.offsetTop - pre) / 2) {
          idx = index ? index - 1 : index
          if (
            index === 0 &&
            hEl.offsetTop >= el.clientHeight * 0.6 &&
            el.scrollTop < el.clientHeight * 0.3
          ) {
            idx = -1
          }
          return true
        }
      })
      current.value = idx
    }, 100)
    function handleCheckCatalog(index: number) {
      const item = list.value[index]
      const el = document.querySelector(`[data-h='${item.id}']`)
      const top = el ? (el as HTMLElement).offsetTop - 8 : 0
      current.value = index
      layout.value.scrollTo({
        left: 0,
        top: top,
        behavior: 'smooth'
      })
      if (catalogTimer) {
        clearTimeout(catalogTimer)
      }
      catalogTimer = setTimeout(() => {
        catalogTimer = null
      }, 1000)
    }
    return {
      componentName,
      list,
      layout,
      blog,
      current,
      handleScroll,
      handleCheckCatalog
    }
  }
}
</script>
<style lang="scss" scoped>
.page-blog-container {
  display: grid;
  grid-template-columns: 1fr 260px;
  column-gap: 20px;
}
.page-blog-right {
  position: relative;
  & > li {
    background-color: #fff;
    border-radius: 4px;
  }
  .blog-catalog {
    position: sticky;
    top: 16px;
  }
}
.blog-title {
  padding: 0 16px;
  line-height: 44px;
  border-bottom: 1px solid #f7f8fa;
  font-size: 16px;
  font-weight: bold;
}
.catalog-wrap {
  padding: 12px 0;
  max-height: 312px;
  overflow-y: auto;
  li {
    position: relative;
    padding: 0 16px;
    line-height: 32px;
    font-size: 14px;
    color: #333;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    cursor: pointer;
  }
  .active {
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      width: 3px;
      height: 14px;
      background-color: rgb(30, 128, 255);
    }
    color: rgb(30, 128, 255);
  }
  li:hover {
    color: rgb(30, 128, 255);
  }
  .catalog-item-2 {
    padding-left: 30px;
    color: rgb(81, 87, 103);
  }
  .catalog-item-3 {
    padding-left: 44px;
    color: rgb(138, 145, 159);
  }
}
</style>

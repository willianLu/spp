<template>
  <PageLayout class="page-blog-wrap" :fullpage="false">
    <section class="blog-wrap">
      <nav class="classify-wrap">
        <ul>
          <li
            v-for="(item, index) in classifyData"
            :key="index"
            :class="{
              active: currentClass === item.title
            }"
            @click="handleClassChange(item)"
          >
            <SvgIcon :name="item.icon"></SvgIcon>{{ item.title }}
          </li>
        </ul>
      </nav>
      <div class="article-wrap">
        <ul class="subclass-wrap flex-v-center">
          <li class="active">推荐</li>
        </ul>
        <ul class="article-content">
          <li v-for="item in list" :key="item.key" @click="checkBlog(item.key)">
            <div>
              <div class="article-title">{{ item.title }}</div>
              <div v-if="item.desc">{{ item.desc }}</div>
              <div>{{ item.date }}</div>
            </div>
          </li>
        </ul>
        <div class="article-footer">已到底了哦～</div>
      </div>
    </section>
  </PageLayout>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import PageLayout from '@/components/page/layout.vue'
import { BlogData, BlogItem } from '@/blogs/index'
import SvgIcon from '@/components/svg-icon.vue'
const router = useRouter()

function checkBlog(key: string) {
  router.push({
    path: '/blog/' + key
  })
}
const currentClass = ref('综合')
const classifyData = ref([
  {
    title: '综合',
    icon: 'all-fill'
  },
  {
    title: '随笔',
    icon: 'writing-fill'
  },
  {
    title: '前端',
    icon: 'computer-fill'
  },
  {
    title: '文档',
    icon: 'folder-fill'
  }
])
const list = ref<BlogItem[]>([])
function handleInit() {
  list.value = BlogData
}
handleInit()
function handleClassChange(row: any) {
  currentClass.value = row.title
  if (currentClass.value === '综合') {
    list.value = BlogData
  } else {
    list.value = BlogData.filter(item => item.tags[0] === row.title)
  }
}
</script>
<style lang="scss" scoped>
.blog-wrap {
  position: relative;
  display: grid;
  grid-template-columns: 180px 1fr;
  gap: 20px;
}
.classify-wrap {
  position: relative;
  ul {
    position: sticky;
    top: 16px;
    left: 0;
    width: 180px;
    padding: 8px;
    max-height: 100%;
    background-color: #fff;
    border-radius: 4px;
    box-sizing: border-box;
  }
  li {
    display: flex;
    align-items: center;
    padding: 10px 17px;
    height: 26px;
    font-size: 18px;
    color: #515657;
    cursor: pointer;
    svg {
      margin-right: 12px;
    }
  }
  .active,
  li:hover {
    background-color: #eaf2ff;
    color: #1e80ff;
  }
}
.article-wrap {
  border-radius: 4px;
  background-color: #fff;
}
.subclass-wrap {
  padding: 12px 0;
  flex-wrap: nowrap;
  overflow-x: auto;
  border-bottom: 1px solid #f7f8fa;
  li {
    flex-shrink: 0;
    padding: 0 16px;
    font-size: 16px;
    color: #909090;
    cursor: pointer;
  }
  .active {
    color: #333;
  }
}
.article-content {
  li {
    line-height: 20px;
    font-size: 12px;
    color: rgb(51, 51, 51);
    transition: all 0.3s ease-in;
    cursor: pointer;
    & > div {
      padding: 12px 20px;
      border-bottom: 1px solid #e4e6eb80;
    }
  }
  li:hover {
    background-color: #f2f3f5;
  }
  .article-title {
    line-height: 24px;
    font-size: 16px;
    font-weight: bold;
    color: #333;
  }
}
.article-footer {
  padding: 16px 0;
  text-align: center;
  font-size: 12px;
  color: #909090;
}
</style>

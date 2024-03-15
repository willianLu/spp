<template>
  <PageLayout>
    <div class="hero-wrap">
      <h1>
        <span>新时代</span><br />
        JavaScript 脚手架
      </h1>
      <div class="hero-tip">
        易学易用，性能出色，适用场景丰富的 Web 前端框架。
      </div>
      <div>
        <a href="#/">
          <span>快速上手</span>
          <SvgIcon name="right-arrow"></SvgIcon>
        </a>
      </div>
    </div>
    <div class="express-wrap">
      <p>中国神龙</p>
      <img src="@/assets/images/loong.png" />
    </div>
    <div class="content-wrap">
      <ul>
        <li
          v-for="(item, index) in list"
          :key="index"
          class="flex-center"
          @click="toPage(item)"
        >
          <div>
            <h3>{{ item.name }}</h3>
            <p>{{ item.desc }}</p>
          </div>
        </li>
      </ul>
    </div>
  </PageLayout>
</template>
<script setup lang="ts">
defineOptions({
  name: 'HomePage'
})
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import PageLayout from '@/components/page/layout.vue'
import SvgIcon from '@/components/svg-icon.vue'
interface List {
  name: string
  desc: string
  href?: string
}
const router = useRouter()
const list = ref<List[]>([])
function handleInit() {
  const cArr = [
    {
      name: '线盒',
      desc: '分割算法，用线围城盒子',
      href: '/line'
    },
    {
      name: '图标库',
      desc: '图标集合，搜集常用图标',
      href: '/icons'
    },
    {
      name: '拼图',
      desc: '小游戏，好玩的拼图游戏',
      href: '/game/puzzle'
    },
    {
      name: '全屏滚动',
      desc: '滚动特效，全屏滚动',
      href: '/fullpage'
    },
    {
      name: '登录页',
      desc: '登录页，特效背景',
      href: '/login'
    },
    {
      name: '图片懒加载',
      desc: '图片懒加载',
      href: '/img/lazy'
    },
    {
      name: '瀑布流',
      desc: '流式布局，瀑布格式',
      href: '/waterfall'
    }
  ]
  list.value = cArr
}
handleInit()
function toPage(item: List) {
  if (item.href) {
    router.push({ path: item.href })
  }
}
</script>
<style lang="scss" scoped>
.hero-wrap {
  padding: 96px 32px;
  text-align: center;
  h1 {
    line-height: 1.2;
    font-size: 64px;
    font-weight: bold;

    span {
      background: -webkit-linear-gradient(315deg, #42d392 25%, #647eff);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
  .hero-tip {
    margin: 24px auto 48px;
    line-height: 1.2;
    font-size: 18px;
    color: rgba(61, 61, 61, 0.7);
  }
  a {
    margin-right: 18px;
    padding: 8px 1em;
    position: relative;
    display: inline-block;
    border-radius: 8px;
    background-color: #42b883;
    text-decoration: none;
    line-height: 24px;
    transition: background-color 0.5s, color 0.5s;
    font-size: 16px;
    font-weight: 600;
    color: #fff;
    svg {
      margin-left: 5px;
    }
  }
  a:hover {
    background-color: #33a06f;
  }
}
.express-wrap {
  padding: 12px 24px;
  border-top: 1px solid rgba(60, 60, 60, 0.12);
  border-bottom: 1px solid rgba(60, 60, 60, 0.12);
  text-align: center;
  line-height: 34px;
  font-size: 13px;
  img {
    display: block;
    margin: 0 auto;
    width: 150px;
  }
}
.content-wrap {
  padding: 44px 32px;
  margin: 0 auto;
  max-width: 848px;
  ul {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-auto-rows: 120px;
    grid-gap: 16px;
  }
  li {
    text-align: center;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 8px;
    cursor: pointer;
    transform: 0.3s background-color;

    div {
      transition: 0.3s all;
    }
    &:hover {
      background-color: #f9f9f9;
      div {
        transform: scale(1.1);
      }
    }
  }

  h3 {
    line-height: 24px;
    font-size: 16px;
    font-weight: bold;
  }
  p {
    line-height: 24px;
    font-size: 13px;
    color: #999;
  }
}
@media screen and (max-width: 768px) {
  .hero-wrap {
    padding: 56px 32px;
    h1 {
      font-size: 36px;
    }
    p {
      font-size: 16px;
    }
  }
}
</style>

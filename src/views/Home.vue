<template>
  <PageLayout>
    <div class="hero-wrap">
      <h1>
        <span>杂七杂八</span><br />
        搜集各种好玩的东东0_0
      </h1>
      <div class="hero-tip">
        基于前端开发，收集各种特效，书写博客，分享技术与生活。
      </div>
      <div>
        <a href="#/special/turntable">
          <span>快速抽奖</span>
          <SvgIcon name="right-arrow"></SvgIcon>
        </a>
      </div>
    </div>
    <div class="express-wrap">
      <p>-- 集齐七颗龙珠，召唤神龙 --</p>
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import PageLayout from '@/components/page/layout.vue'
import SvgIcon from '@/components/svg-icon.vue'
defineOptions({
  name: 'HomePage'
})
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
      desc: '浏览器原生支持，技术分享',
      href: '/img/lazy'
    },
    {
      name: '瀑布流',
      desc: '流式布局，瀑布格式',
      href: '/waterfall'
    },
    {
      name: '博客',
      desc: '日常生活，技术博客，文档共享',
      href: '/blog'
    },
    {
      name: '星空',
      desc: '仰望星空，迷恋遥远的深邃',
      href: '/special/star'
    },
    {
      name: '大转盘',
      desc: '一起来转盘，转出好心情',
      href: '/special/turntable'
    },
    {
      name: 'T29',
      desc: 'T29坦克3D模型',
      href: '/special/tank'
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
    line-height: 1.5;
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
    overflow: hidden;
    svg {
      margin-left: 5px;
    }
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 0;
      height: 0;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.5);
      opacity: 0;
      animation: ripple 1s ease-out infinite;
    }
    @keyframes ripple {
      0% {
        opacity: 1;
      }
      100% {
        width: 200px;
        height: 200px;
        opacity: 0;
      }
    }
  }
  a:hover {
    background-color: #33a06f;
  }
}
.express-wrap {
  padding: 32px 24px;
  border-top: 1px solid rgba(60, 60, 60, 0.12);
  border-bottom: 1px solid rgba(60, 60, 60, 0.12);
  text-align: center;
  font-size: 13px;
  img {
    display: block;
    margin: 8px auto 0;
    width: 150px;
  }
}
.content-wrap {
  padding: 56px 32px;
  margin: 0 auto;
  max-width: 1080px;
  ul {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-auto-rows: 120px;
    grid-gap: 20px;
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

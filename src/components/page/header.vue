<template>
  <header class="page-header">
    <section>
      <div class="page-header-left">
        <img src="@/assets/images/logo.png" @click="toHome" />
      </div>
      <div class="page-header-right">
        <ul>
          <li :class="{ active: route.path === '/' }">
            <router-link to="/">首页</router-link>
          </li>
          <li :class="{ active: route.path === '/blog' }">
            <router-link to="/blog">博客</router-link>
          </li>
          <li>
            <a href="https://github.com/willianLu/spp" target="_blank">
              <SvgIcon class="icon-github" name="github" />
            </a>
          </li>
        </ul>
      </div>
    </section>
  </header>
</template>
<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import SvgIcon from '@/components/svg-icon.vue'
const route = useRoute()
const router = useRouter()
function toHome() {
  router.push({ path: '/' })
}
</script>
<style lang="scss" scoped>
.page-header {
  box-shadow: 0 2px 10px 0 rgba(60, 60, 60, 0.12);
  section {
    margin: 0 auto;
    padding: 0 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1200px;
    height: 55px;
    color: #213547;
  }
  &-left {
    img {
      width: 100px;
      cursor: pointer;
    }
    font-size: 16px;
    font-weight: 500;
  }
  &-right {
    ul {
      display: flex;
      align-items: center;
      font-size: 13px;
    }
    li {
      padding: 0 12px;
    }
    a {
      text-decoration: none;
      color: #213547;
    }
    .active {
      a {
        color: #1e80ff;
      }
    }
  }
}
</style>

<template>
  <section class="status-bar">
    <div class="weather-wrap flex-center-space-between">
      <p class="weather-title">{{ currentDate }}</p>
      <p class="flex-center weather-info">
        <span :class="'qi-' + weather.icon"></span>
        <span>{{ weather.temp }}°</span>
        <span>{{ weather.windDir }}</span>
      </p>
    </div>
    <div class="humor-expression">
      <span>{{ humor.expression }}</span>
      <SvgIcon name="change" @click="handleHumorData"></SvgIcon>
    </div>
    <div class="humor-tip">{{ humor.text }}</div>
  </section>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import SvgIcon from './svg-icon.vue'
import useHomeStore from '@/store/index'
import { formatDate } from '@/utils/util'
// 引入和风天气图标
import 'qweather-icons/font/qweather-icons.css'
import { getHumorData } from '@/utils/humor'

const homeStore = useHomeStore()
const currentDate = formatDate(new Date(), 'MM月dd号')
const weather = ref<Record<string, any>>({})
const humor = ref<Record<string, any>>({})
function handleInit() {
  const timestemp = Date.now()
  homeStore.weatherData.some((item, index) => {
    if (timestemp < new Date(item.fxTime).getTime()) {
      weather.value = homeStore.weatherData[index === 0 ? index : index - 1]
      return true
    } else if (index === homeStore.weatherData.length - 1) {
      weather.value = homeStore.weatherData[index]
    }
  })
  handleHumorData()
}
handleInit()
function handleHumorData() {
  humor.value = getHumorData()
}
</script>
<style lang="scss" scoped>
.status-bar {
  background-color: #fff;
}
.weather-wrap {
  padding: 0 16px;
  line-height: 44px;
  border-bottom: 1px solid #f7f8fa;
  font-size: 16px;
  .weather-title {
    font-weight: bold;
  }
  .weather-info {
    span + span {
      margin-left: 5px;
    }
  }
}
.humor-expression {
  position: relative;
  padding: 12px 0;
  text-align: center;
  font-size: 68px;
  svg {
    position: absolute;
    top: 16px;
    right: 16px;
    font-size: 18px;
    color: #999;
    cursor: pointer;
    &:hover {
      color: #1e80ff;
    }
  }
}
.humor-tip {
  padding: 0 16px 16px;
  text-align: center;
  white-space: pre-wrap;
  line-height: 20px;
  font-size: 14px;
}
</style>

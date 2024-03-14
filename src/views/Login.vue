<template>
  <section class="login-wrap flex-center">
    <canvas id="my-canvas"></canvas>
    <div class="login-box">
      <div class="logo flex-center">
        <img src="../assets/vue.svg" />
        <span>后台管理</span>
      </div>
      <el-input
        v-model="phone"
        class="input-item"
        type="tel"
        size="large"
        placeholder="请输入手机号"
        maxlength="11"
        clearable
      >
        <template #prefix>
          <SvgIcon class="input-icon" name="mobile-phone"></SvgIcon>
        </template>
      </el-input>
      <el-input
        v-model="password"
        class="input-item"
        size="large"
        placeholder="请输入密码"
        show-password
        maxlength="32"
        clearable
      >
        <template #prefix>
          <SvgIcon class="input-icon" name="lock"></SvgIcon>
        </template>
      </el-input>
      <el-checkbox
        v-model="rememberPassword"
        label="记住密码"
        size="large"
        style="margin-top: 12px"
      />
      <el-button class="login-btn" type="primary" round size="large"
        >登录</el-button
      >
    </div>
  </section>
</template>
<script setup lang="ts">
import { ref, onMounted, watch, onUnmounted } from 'vue'
import { useWindowSize } from '@vueuse/core'
import ConfettiGenerator from 'confetti-js'
import SvgIcon from '@/components/svg-icon.vue'

const phone = ref('')
const password = ref('')
const rememberPassword = ref(false)
const confetti = ref()
onMounted(() => {
  confetti.value = new ConfettiGenerator({ target: 'my-canvas' })
  confetti.value.render()
})
onUnmounted(() => {
  confetti.value?.clear()
})
const rect = useWindowSize()
watch(rect.width, () => {
  // 屏幕变化时，需要先清除，再重新new
  confetti.value?.clear()
  confetti.value = new ConfettiGenerator({ target: 'my-canvas' })
  confetti.value.render()
})
</script>
<style lang="scss" scoped>
.login-wrap {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
}
#my-canvas {
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
}
.login-box {
  margin: 100px 16px;
  padding: 32px;
  max-width: 400px;
  width: 100%;
  background-color: #fff;
  border: 1px solid rgba(60, 60, 67, 0.12);
  border-radius: 16px;
  .logo {
    margin: 32px auto 68px;
    font-size: 36px;
    font-weight: bold;
    img {
      margin-right: 12px;
      display: block;
      width: 60px;
    }
  }
}
.input-item + .input-item {
  margin-top: 32px;
}
.input-icon {
  font-size: 24px;
}
.login-btn {
  margin-top: 64px;
  width: 100%;
}
@media screen and (max-width: 414px) {
  .login-box {
    padding: 32px 16px;
  }
}
</style>

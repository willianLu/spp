<template>
  <section class="login-wrap flex-center">
    <canvas id="my-canvas"></canvas>
    <div class="login-box">
      <div class="logo flex-center">
        <img src="../assets/images/logo.png" />
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
  background: url(@/assets/images/noise.svg);
}
#my-canvas {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
.login-box {
  position: relative;
  margin: 100px 16px;
  padding: 32px 56px;
  max-width: 360px;
  width: 100%;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(95, 144, 254, 0.2);
  .logo {
    margin: 32px auto 68px;
    img {
      width: 200px;
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

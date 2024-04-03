<template>
  <PageLayout>
    <canvas ref="star" class="star-wrap"></canvas>
  </PageLayout>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import PageLayout from '@/components/page/layout.vue'
const star = ref()
onMounted(() => {
  handleDrawStar()
})

function handleDrawStar() {
  const canvas = star.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  canvas.width = canvas.clientWidth
  canvas.height = canvas.clientHeight
  const hue = 217
  const stars: any[] = []
  const maxStars = 1300 //星星数量
  const starImg = getStarImg(hue)
  for (let i = 0; i < maxStars; i++) {
    stars.push(
      new Star({
        width: canvas.width,
        height: canvas.height,
        ctx,
        starImg,
        maxStars
      })
    )
  }
  animation({
    width: canvas.width,
    height: canvas.height,
    ctx,
    hue,
    stars
  })
}

function animation(options: any) {
  const { ctx, hue, width, height, stars } = options
  ctx.globalCompositeOperation = 'source-over'
  ctx.globalAlpha = 0.5 //尾巴
  ctx.fillStyle = 'hsla(' + hue + ', 64%, 6%, 1)'
  ctx.fillRect(0, 0, width, height)

  ctx.globalCompositeOperation = 'lighter'
  for (let i = 0, l = stars.length; i < l; i++) {
    stars[i].draw()
  }
  window.requestAnimationFrame(() => {
    animation(options)
  })
}

function getStarImg(hue: number) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
  canvas.width = 100
  canvas.height = 100
  const half = canvas.width / 2
  const gradient = ctx.createRadialGradient(half, half, 0, half, half, half)
  gradient.addColorStop(0.025, '#CCC')
  gradient.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)')
  gradient.addColorStop(0.25, 'hsl(' + hue + ', 64%, 6%)')
  gradient.addColorStop(1, 'transparent')

  ctx.fillStyle = gradient
  ctx.beginPath()
  ctx.arc(half, half, half, 0, Math.PI * 2)
  ctx.fill()
  return canvas
}

function random(min, max?: number) {
  if (max === undefined) {
    max = min
    min = 0
  }
  const _max = max
  if (min > (max as number)) {
    max = min
    min = _max
  }
  return Math.floor(Math.random() * ((max as number) - min + 1)) + min
}

function maxOrbit(x: number, y: number) {
  const max = Math.max(x, y)
  const diameter = Math.round(Math.sqrt(max * max + max * max))
  //星星移动范围，值越大范围越小，
  return diameter / 2
}
const Star = function (this: any, options: any = {}) {
  this.orbitRadius = random(maxOrbit(options.width, options.height))
  // 星星大小
  this.radius = random(60, this.orbitRadius) / 8
  this.orbitX = options.width / 2
  this.orbitY = options.height / 2
  this.timePassed = random(0, options.maxStars)
  // 星星移动速度
  this.speed = random(this.orbitRadius) / 50000
  this.alpha = random(2, 10) / 10
  this.ctx = options.ctx
  this.starImg = options.starImg
}

Star.prototype.draw = function () {
  const x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX,
    y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY,
    twinkle = random(10)

  if (twinkle === 1 && this.alpha > 0) {
    this.alpha -= 0.05
  } else if (twinkle === 2 && this.alpha < 1) {
    this.alpha += 0.05
  }

  this.ctx.globalAlpha = this.alpha
  this.ctx.drawImage(
    this.starImg,
    x - this.radius / 2,
    y - this.radius / 2,
    this.radius,
    this.radius
  )
  this.timePassed += this.speed
}
</script>
<style lang="scss" scoped>
.star-wrap {
  width: 100%;
  height: 100%;
}
</style>

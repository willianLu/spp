<template>
  <PageLayout :fullpage="false">
    <div class="title">莲花绽放</div>
    <div class="lotus-wrap">
      <div class="ripple r1"></div>
      <div class="ripple r2"></div>
      <div class="lotus">
        <div class="leaf l1"></div>
        <div class="leaf l2"></div>
        <div class="center"></div>
        <div class="petal p1"></div>
        <div class="petal p2"></div>
        <div class="petal p3"></div>
        <div class="petal p4"></div>
        <div class="petal p5"></div>
        <div class="petal p6"></div>
        <div class="petal p7"></div>
        <div class="magic m1"></div>
        <div class="magic m2"></div>
        <div class="magic m3"></div>
        <div class="magic m4"></div>
        <div class="magic m5"></div>
        <div class="magic m6"></div>
        <div class="magic m7"></div>
      </div>
    </div>
  </PageLayout>
</template>
<script setup lang="ts">
import PageLayout from '@/components/page/layout.vue'
</script>
<style lang="scss" scoped>
.title {
  padding: 16px 0 32px;
  text-align: center;
  font-size: 44px;
  font-weight: bold;
  color: #ee5353;
}

.lotus-wrap {
  margin: 0 auto;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: linear-gradient(
    #08abeb 8%,
    #fafbfc 40%,
    #fafbfc 50%,
    #08dce7 68%,
    #026f75
  );
}

.ripple {
  position: absolute;
  align-self: center;
  justify-self: center;
  border-bottom: 5px solid white;
  border-radius: 50%;
  animation: rp 10s 4s ease-out infinite;
}

.r2 {
  animation-delay: 9s;
}

.lotus {
  position: relative;
  align-self: center;
  justify-self: center;
  width: 300px;
  height: 300px;
  -webkit-box-reflect: below -250px linear-gradient(rgba(0, 0, 0, 0.05) 50%, rgba(0, 0, 0, 0.25));
  animation: wobble 5s 5s linear infinite;
}

.petal {
  background: #fd9ebe;
  width: 100px;
  height: 100px;
  opacity: 80%;
  position: absolute;
  border-radius: 0% 90% 0% 90%/0% 90% 0% 90%;
  left: 50%;
  margin-left: -100px;
  top: 50%;
  margin-top: -100px;
}

.p1 {
  transform-origin: bottom right;
  animation: pt1 5s;
  animation-fill-mode: forwards;
}

.p2 {
  transform-origin: bottom right;
  animation: pt2 5s;
  animation-fill-mode: forwards;
}

.p3 {
  transform-origin: bottom right;
  animation: pt3 5s;
  animation-fill-mode: forwards;
}

.p4 {
  transform-origin: bottom right;
  animation: pt4 5s;
  animation-fill-mode: forwards;
}

.p5 {
  transform-origin: bottom right;
  animation: pt5 5s;
  animation-fill-mode: forwards;
}

.p6 {
  transform-origin: bottom right;
  animation: pt6 5s;
  animation-fill-mode: forwards;
}

.p7 {
  transform-origin: bottom right;
  animation: pt7 5s;
  animation-fill-mode: forwards;
}

.leaf {
  width: 100px;
  height: 100px;
  background: #016b55;
  position: absolute;
  border-radius: 0% 90% 0% 90%/0% 90% 0% 90%;
  left: 50%;
  margin-left: -100px;
  top: 50%;
  margin-top: -100px;
}

.l1 {
  transform-origin: bottom right;
  animation: lf1 5s;
  animation-fill-mode: forwards;
}

.l2 {
  transform-origin: bottom right;
  animation: lf2 5s;
  animation-fill-mode: forwards;
}

.center {
  background: #016b55;
  width: 50px;
  height: 50px;
  position: absolute;
  border-radius: 50%;
  left: 50%;
  margin-left: -25px;
  top: 50%;
  margin-top: -25px;
  animation: c 8s;
  animation-fill-mode: forwards;
}

.magic {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #faf2f5;
  box-shadow: 0 0 3px 1px #fbf0f4;
  position: absolute;
  top: 20%;
  left: 50%;
  margin-left: -2px;
  opacity: 0.3;
}

.m1 {
  opacity: 0;
  animation: fadein 5s 2s ease infinite, floatup 5s 2s ease infinite,
    left 5s 2s ease infinite;
}

.m2 {
  opacity: 0;
  animation: fadein 5s 2.5s ease infinite, floatup 5s 2.5s ease infinite,
    right 5s 2.5s ease infinite;
}

.m3 {
  opacity: 0;
  animation: fadein 5s 3s ease infinite, floatup 5s 3s ease infinite,
    farleft 5s 3s ease infinite;
}

.m4 {
  opacity: 0;
  animation: fadein 5s 3.5s ease infinite, floatup 5s 3.5s ease infinite,
    farright 5s 3.5s ease infinite;
}

.m5 {
  opacity: 0;
  animation: fadein 5s 4s linear infinite, floatup 5s 4s linear infinite;
}

.m6 {
  opacity: 0;
  animation: fadein 5s 4.5s ease infinite, floatup 5s 4.5s ease infinite,
    left 5s 4.5s ease infinite;
}

.m7 {
  opacity: 0;
  animation: fadein 5s 5s ease infinite, floatup 5s 5s ease infinite,
    right 5s 5s ease infinite;
}

@keyframes pt1 {
  0% {
    transform: rotate(45deg) scale(0);
  }
  100% {
    transform: rotate(-30deg) scale(1);
  }
}
@keyframes pt2 {
  0% {
    transform: rotate(45deg) scale(0);
  }
  100% {
    transform: rotate(-5deg) scale(1);
  }
}
@keyframes pt3 {
  0% {
    transform: rotate(45deg) scale(0);
  }
  100% {
    transform: rotate(20deg) scale(1);
  }
}
@keyframes pt4 {
  0% {
    transform: rotate(45deg) scale(0);
  }
  100% {
    transform: rotate(45deg) scale(1);
  }
}
@keyframes pt5 {
  0% {
    transform: rotate(45deg) scale(0);
  }
  100% {
    transform: rotate(70deg) scale(1);
  }
}
@keyframes pt6 {
  0% {
    transform: rotate(45deg) scale(0);
  }
  100% {
    transform: rotate(95deg) scale(1);
  }
}
@keyframes pt7 {
  0% {
    transform: rotate(45deg) scale(0);
  }
  100% {
    transform: rotate(120deg) scale(1);
  }
}
@keyframes lf1 {
  0% {
    transform: rotate(45deg) scale(0);
  }
  100% {
    transform: rotate(-45deg) scale(1);
  }
}
@keyframes lf2 {
  0% {
    transform: rotate(45deg) scale(0);
  }
  100% {
    transform: rotate(135deg) scale(1);
  }
}
@keyframes c {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes fadein {
  0%,
  100% {
    opacity: 0;
  }
  75% {
    opacity: 100%;
  }
}
@keyframes floatup {
  0% {
    top: 50px;
  }
  100% {
    top: -100px;
  }
}
@keyframes left {
  0% {
    left: 150px;
  }
  100% {
    left: 50px;
  }
}
@keyframes right {
  0% {
    left: 150px;
  }
  100% {
    left: 250px;
  }
}
@keyframes farleft {
  0% {
    left: 150px;
  }
  100% {
    left: 0px;
  }
}
@keyframes farright {
  0% {
    left: 150px;
  }
  100% {
    left: 300px;
  }
}
@keyframes rp {
  0% {
    width: 0;
    height: 0;
    opacity: 0;
    margin: 0;
  }
  50% {
    opacity: 25%;
  }
  100% {
    opacity: 0;
    width: 500px;
    height: 250px;
  }
}
@keyframes wobble {
  0%,
  50%,
  100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(1deg);
  }
  75% {
    transform: rotate(-1deg);
  }
}
</style>

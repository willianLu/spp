<template>
  <PageLayout>
    <div ref="t29" class="tank-wrap"></div>
  </PageLayout>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import PageLayout from '@/components/page/layout.vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
const t29 = ref()
onMounted(() => {
  handleInit()
})
let model
function handleInit() {
  if (!t29.value) return
  const el = t29.value
  // WebGL渲染器
  // antialias是否执行抗锯齿。默认为false.
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  // 设置设备像素比。通常用于避免HiDPI设备上绘图模糊
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(el.clientWidth, el.clientHeight)
  // 设置色调映射  这个属性用于在普通计算机显示器或者移动设备屏幕等低动态范围介质上，模拟、逼近高动态范围（HDR）效果。
  renderer.toneMapping = THREE.ReinhardToneMapping
  el.appendChild(renderer.domElement)
  // 创建新的场景对象。
  const scene = new THREE.Scene()
  // 创建透视相机
  const camera = new THREE.PerspectiveCamera(
    36,
    el.clientWidth / el.clientHeight,
    1,
    300
  )
  camera.position.set(-3, 2, -2)
  scene.add(camera)

  // AxesHelper：辅助观察的坐标系
  const axesHelper = new THREE.AxesHelper(150)
  scene.add(axesHelper)

  // 创建轨道控制器
  const controls = new OrbitControls(camera, renderer.domElement)
  // 添加了一个环境光
  scene.add(new THREE.AmbientLight(0xcccccc, 0.4))
  // 创建了一个点光源
  const pointLight = new THREE.PointLight(0xffffff, 2000)
  camera.add(pointLight)

  // 模型加载
  new GLTFLoader().load('/model/t29.glb', function (gltf) {
    model = gltf.scene
    scene.add(model)
    animate()
  })
  function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
  }
}
</script>
<style lang="scss" scoped>
.tank-wrap {
  width: 100%;
  height: 100%;
  background-color: #f2f3f4;
}
</style>

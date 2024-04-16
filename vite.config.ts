import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import eslintPlugin from '@nabla/vite-plugin-eslint'
import svgLoader from 'vite-svg-loader'
// UI库 - 按需加载
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Markdown from 'vite-plugin-md'
import VitePluginSimpleMock from 'vite-plugin-simple-mock'
import Mock from './mock/index'
import del from 'rollup-plugin-delete'

const isDev = process.env.NODE_ENV === 'develpoment'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    proxy: {
      // '/tc-api/': {
      //   target: 'http://192.168.11.144:7001',
      //   rewrite: path => path.replace(/^\/tc-api/, '')
      // }
    }
  },
  assetsInclude: ['**/*.glb'],
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/]
    }),
    Markdown(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    }),
    eslintPlugin({
      eslintOptions: {
        cache: false
      }
    }),
    svgLoader(),
    VitePluginSimpleMock(Mock, {
      proxy: [/^\/api\//, /^\/server\//, /^\/qtapi\//]
    }),
    del({
      targets: ['./dist']
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src') // 把 @ 指向到 src 目录去
    }
  },
  base: './',
  build: {
    emptyOutDir: true,
    rollupOptions: {
      output: {
        // chunk代码输入位置
        chunkFileNames: 'js/[name]-[hash].js',
        // 入口文件代码输出位置
        entryFileNames: 'js/[name]-[hash].js',
        // 资源文件输入位置处理
        assetFileNames: assetInfo => {
          const { name } = assetInfo
          const index = name.lastIndexOf('.')
          const ext = name.substring(index + 1)
          // 图片类型文件存放在images文件夹下
          if (/^(png|jpg|gif|jpeg|svg)$/.test(ext)) {
            return `images/[name]-[hash].${ext}`
          }
          if (/^(ttf|woff|woff2)$/.test(ext)) {
            return `fonts/[name]-[hash].${ext}`
          }
          return `${ext}/[name]-[hash].${ext}`
        },
        // code splitting 拆包
        manualChunks(id) {
          // vue相关包放到一起
          if (/node_modules\/(vue|vue-router)/.test(id)) {
            return 'vue-vendor'
          }
          // svg icon 打包到一起
          if (/icons\/(.)\.svg$/.test(id)) {
            return 'svg-icons'
          }
          // 第三方modules打包在一起
          // if (/node_modules/.test(id)) {
          //   return 'vendor'
          // }
        }
      }
    }
  },
  esbuild: {
    // 打包删除console 和 debugger
    drop: isDev ? [] : ['console', 'debugger']
  }
})

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './routes'
import '@/assets/css/index.scss'
import 'element-plus/es/components/message/style/css'
import App from './App.vue'

const app = createApp(App)
app.use(createPinia()).use(router).mount('#app')

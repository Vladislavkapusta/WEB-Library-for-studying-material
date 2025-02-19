import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { MotionOnePlugin } from 'vue-motion-one'
import { createPinia } from 'pinia'

const app = createApp(App)

const pinia = createPinia() // Создаем экземпляр Pinia

app.use(router)
app.use(MotionOnePlugin)
app.use(pinia)

app.mount('#app')

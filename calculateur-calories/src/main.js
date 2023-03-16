import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueSvgIconPlugin } from '@yzfe/vue3-svgicon'
import '@yzfe/svgicon/lib/svgicon.css'
import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueSvgIconPlugin, { tagName: 'icon' })

app.mount('#app')

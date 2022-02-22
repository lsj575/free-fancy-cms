import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import store, { setupStore } from './store'
// require('./mock/index')

import 'normalize.css'
import './assets/css/index.scss'

import { registerApp } from './global'

const app = createApp(App)
registerApp(app)
app.use(store)
setupStore()
app.use(router)
app.mount('#app')

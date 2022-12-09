import { createApp } from 'vue'
import App from './App.vue'

import './assets/css/bootstrap.css'
import './index.css'

import Global from './components/Global.vue'

const app = createApp(App)

app.component('MyGlobal', Global)

app.mount('#app')
// createApp(App).mount('#app')

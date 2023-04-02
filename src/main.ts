import { createApp } from 'vue'
import { createPinia } from 'pinia'
import LogRocket from 'logrocket';

import App from './App.vue'
import router from './router'
import "./registerServiceWorker";
import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
// metrics
LogRocket.init('ixudcg/image-converter');
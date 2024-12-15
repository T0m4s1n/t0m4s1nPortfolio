import './assets/main.css'
import { i18nPlugin } from './translate';

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
app.use(i18nPlugin);

app.mount('#app')

import './assets/index.css'
import 'primevue/resources/themes/aura-light-green/theme.css'

import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import App from './App.vue'
import axios from 'axios'

axios.interceptors.request.use(
    config => {
        config.headers['Authorization'] = `devices-storage`;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

const app = createApp(App)
app.use(PrimeVue)
app.mount('#app')

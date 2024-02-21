import './assets/index.css'
import 'primevue/resources/themes/aura-light-green/theme.css'

import {createApp, provide} from 'vue'
import PrimeVue from 'primevue/config'
import App from './App.vue'
import axios from 'axios'
import { i18n } from "@/plugins/i18n";

axios.defaults.baseURL = 'http://127.0.0.1:8081';
axios.interceptors.request.use(
    config => {
        config.headers['Authorization'] = `devices-storage`;
        config.headers['Content-Type'] = 'application/json';
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

const app = createApp(App)
app.use(PrimeVue)
app.use(i18n)
app.mount('#app')
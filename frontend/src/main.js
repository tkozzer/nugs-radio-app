import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './index.css'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'default', component: App },
        { path: '/phish', name: 'phish', component: App },
        { path: '/pearl-jam', name: 'pearl-jam', component: App },
        { path: '/shuffle', name: 'shuffle', component: App },
    ]
})

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')


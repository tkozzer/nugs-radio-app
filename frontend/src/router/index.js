import { createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue'
import Phish from '../views/Phish.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: App
    },
    {
        path: '/phish/:id',
        name: 'Phish',
        component: Phish
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
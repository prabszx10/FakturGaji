import {createRouter, createWebHistory} from 'vue-router'
import FakturGaji from './layouts/FakturGaji.vue'
import DetailFaktur from './layouts/DetailFaktur.vue'
import DetailPembayaran from './layouts/DetailPembayaran.vue'

const routes =[
    {
        path: '/',
        component: FakturGaji
    },
    {
        path: '/detailFaktur',
        component: DetailFaktur
    },
    {
        path: '/detailPembayaran',
        component: DetailPembayaran
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
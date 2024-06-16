import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import ListTugas from '../ListTugas.vue'

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/tugas1',
    component: ListTugas,
    props: { url: 'https://tugas1-pbk-223510095.vercel.app' }
  },
  {
    path: '/tugas2',
    component: ListTugas,
    props: { url: 'https://tugas2-nurazima-223510095.vercel.app' }
  },
  {
    path: '/tugas3',
    component: ListTugas,
    props: { url: 'https://tugas3zima.vercel.app' }
  },
  {
    path: '/tugas4',
    component: ListTugas,
    props: { url: 'https://tugas4zima.vercel.app' }
  },
  {
    path: '/tugas5',
    component: ListTugas,
    props: { url: 'https://tugas5pbk-chi.vercel.app' }
  },
  {
    path: '/tugas6',
    component: ListTugas,
    props: { url: 'https://tugas6zima.vercel.app' }
  },
  {
    path: '/tugas7',
    component: ListTugas,
    props: { url: 'https://223510095-tugas7.vercel.app' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

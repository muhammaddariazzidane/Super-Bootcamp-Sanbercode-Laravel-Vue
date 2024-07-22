import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/components/layouts/AppLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AppLayout,
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('@/views/HomeView.vue')
        },
        {
          path: 'film',
          name: 'Film',
          component: () => import('@/views/FilmView.vue')
        },
        {
          path: 'cast',
          name: 'Cast',
          component: () => import('@/views/CastView.vue')
        },
        {
          path: 'genre',
          name: 'Genre',
          component: () => import('@/views/GenreView.vue')
        },
        {
          path: 'verify-account',
          name: 'VerifyAccount',
          component: () => import('@/views/VerifyAccountView.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/LoginView.vue'),
      meta: {
        transition: 'slide-fade'
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/RegisterView.vue'),
      meta: {
        transition: 'slide-fade'
      }
    }
  ]
})

export default router

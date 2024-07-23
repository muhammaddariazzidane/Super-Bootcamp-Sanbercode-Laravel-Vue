import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/components/layouts/AppLayout.vue'
import { useAuthStore } from '@/stores/useAuthStore'

const isAuthenticated = () => {
  const authStore = useAuthStore()
  if (authStore.user) return true
  return false
}
const requireNotAuthenticated = (to, from, next) => {
  if (isAuthenticated()) {
    next({ name: 'Home' })
  } else {
    next()
  }
}

const requireEmailNotVerified = (to, from, next) => {
  const authStore = useAuthStore()
  if (!isAuthenticated() || authStore.user.email_verified_at) {
    next({ name: 'Home' })
  } else {
    next()
  }
}

const requireAuthenticatedAndEmailVerified = (to, from, next) => {
  const authStore = useAuthStore()
  if (!isAuthenticated() || !authStore.user.email_verified_at) {
    next({ name: 'Home' })
  } else {
    next()
  }
}
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
          path: 'profile',
          name: 'Profile',
          component: () => import('@/views/ProfileView.vue'),
          beforeEnter: requireAuthenticatedAndEmailVerified
        },
        {
          path: 'verify-account',
          name: 'VerifyAccount',
          component: () => import('@/views/VerifyAccountView.vue'),
          beforeEnter: requireEmailNotVerified
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/LoginView.vue'),
      meta: {
        transition: 'slide-fade'
      },
      beforeEnter: requireNotAuthenticated
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/RegisterView.vue'),
      meta: {
        transition: 'slide-fade'
      },
      beforeEnter: requireNotAuthenticated
    }
  ]
})

export default router

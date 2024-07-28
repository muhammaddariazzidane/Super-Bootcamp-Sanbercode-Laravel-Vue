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

const requireIsAdmin = (to, from, next) => {
  const authStore = useAuthStore()
  if (!isAuthenticated() || !authStore.user.email_verified_at || !authStore.user.role.name === 'admin') {
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
          path:'film/:id',
          name: 'Film Detail',
          component: () => import('@/components/pages/film/DetailFilmPage.vue')
        },
        {
          path: 'cast',
          name: 'Cast',
          component: () => import('@/views/CastView.vue')
        },
        {
          path: 'cast/:id',
          name: 'Cast Detail',
          component: () => import('@/components/pages/cast/DetailCastPage.vue')
        },
        {
          path: 'genre',
          name: 'Genre',
          component: () => import('@/views/GenreView.vue')
        },
        {
          path: 'genre/:id',
          name: 'Genre Detail',
          component: () => import('@/components/pages/genre/DetailGenrePage.vue')
        },
        {
          path: 'film-cast',
          name: 'Film Cast',
          component: () => import('@/views/FilmCastView.vue')
        },
        {
          path: 'film-cast/:id',
          name: 'Film Cast Detail',
          component: () => import('@/components/pages/film-cast/DetailFilmCastPage.vue')
        },
        {
          path: 'profile',
          name: 'Profile',
          component: () => import('@/views/ProfileView.vue'),
          beforeEnter: requireAuthenticatedAndEmailVerified
        },
        {
          path: 'update-user',
          name: 'Update User',
          component: () => import('@/views/UpdateUserView.vue'),
          beforeEnter: requireAuthenticatedAndEmailVerified
        },
        {
          path: 'verify-account',
          name: 'Verify Account',
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
    },
    {
      path: '/dashboard',
      beforeEnter: requireIsAdmin,
      component: AppLayout,
      children: [
        {
          path: 'film',
          name: 'Dashboard Film',
          component: () => import('@/views/dashboard/DashboardFilmView.vue')
        },
        {
          path: 'film/:id',
          name: 'Dashboard Film Edit',
          component: () => import('@/components/pages/dashboard/DashboardFilmEditPage.vue')
        },
        {
          path: 'cast',
          name: 'Dashboard Cast',
          component: () => import('@/views/dashboard/DashboardCastView.vue')
        },
        {
          path: 'cast/:id',
          name: 'Dashboard Cast Edit',
          component: () => import('@/components/pages/dashboard/DashboardCastEditPage.vue')
        },
        {
          path: 'genre',
          name: 'Dashboard Genre',
          component: () => import('@/views/dashboard/DashboardGenreView.vue')
        },
        {
          path: 'genre/:id',
          name: 'Dashboard Genre Edit',
          component: () => import('@/components/pages/dashboard/DashboardGenreEditPage.vue')
        },
        {
          path: 'role',
          name: 'Dashboard Role',
          component: () => import('@/views/dashboard/DashboardRoleView.vue')
        },
        {
          path: 'role/:id',
          name: 'Dashboard Role Edit',
          component: () => import('@/components/pages/dashboard/DashboardRoleEditPage.vue')
        },
        {
          path: 'film-cast',
          name: 'Dashboard Film Cast',
          component: () => import('@/views/dashboard/DashboardFilmCastView.vue')
        },
        {
          path: 'film-cast/:id',
          name: 'Dashboard Film Cast Edit',
          component: () => import('@/components/pages/dashboard/DashboardFilmCastEditPage.vue')
        },
      ]
    }
  ]
})

export default router

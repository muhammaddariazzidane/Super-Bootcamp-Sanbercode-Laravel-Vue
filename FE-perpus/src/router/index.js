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

const requireAuthenticated = (to, from, next) => {
  if (!isAuthenticated()) {
    next({ name: 'Login' })
  } else {
    next()
  }
}

const requireIsOwner = (to, from, next) => {
  const authStore = useAuthStore()
  if (!isAuthenticated() || !authStore.user.role.name === 'owner') {
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
          path: 'book',
          name: 'Book',
          component: () => import('@/components/pages/book/BookPage.vue')
        },
        {
          path: 'book/:id',
          name: 'Book Detail',
          component: () => import('@/components/pages/book/DetailBookPage.vue')
        },
        {
          path: 'category',
          name: 'Category',
          component: () => import('@/views/CategoryView.vue')
        },
        {
          path: 'category/:id',
          name: 'Category Detail',
          component: () => import('@/components/pages/category/DetailCategoryPage.vue')
        },
        {
          path: 'borrow',
          name: 'Borrow',
          component: () => import('@/views/BorrowView.vue'),
          beforeEnter: requireAuthenticated
        },
        {
          path: 'profile',
          name: 'Profile',
          component: () => import('@/views/ProfileView.vue'),
          beforeEnter: requireAuthenticated
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
      beforeEnter: requireIsOwner,
      component: AppLayout,
      children: [
        {
          path: 'book',
          name: 'Dashboard Book',
          component: () => import('@/views/dashboard/DashboardBookView.vue')
        },
        {
          path: 'book/:id',
          name: 'Dashboard Book Edit',
          component: () => import('@/components/pages/dashboard/DashboardBookEditPage.vue')
        },
        {
          path: 'category',
          name: 'Dashboard Category',
          component: () => import('@/views/dashboard/DashboardCategoryView.vue')
        },
        {
          path: 'category/:id',
          name: 'Dashboard Category Edit',
          component: () => import('@/components/pages/dashboard/DashboardCategoryEditPage.vue')
        },
        {
          path: 'borrow',
          name: 'Dashboard Borrow',
          component: () => import('@/views/dashboard/DashboardBorrowView.vue')
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
        }
      ]
    }
  ]
})

export default router

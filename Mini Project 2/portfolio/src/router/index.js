import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue')
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('@/views/ProjectView.vue')
    },
    {
      path: '/certifications',
      name: 'certifications',
      component: () => import('@/views/CertificationView.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('@/views/ContactView.vue')
    },
    {
      path: '/experience/:id',
      name: 'experience-detail',
      component: () => import('@/views/ExperienceDetailView.vue')
    },
    {
      path: '/education/:id',
      name: 'education-detail',
      component: () => import('@/views/EducationDetailView.vue')
    }
  ]
})

export default router

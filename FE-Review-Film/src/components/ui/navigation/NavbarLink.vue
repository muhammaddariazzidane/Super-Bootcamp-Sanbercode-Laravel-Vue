<script setup>
import { RouterLink, useRoute } from 'vue-router'
import { Button } from '@/components/ui/button'
import { navigationLinks, dashboardLinks } from '@/constant/navigation-link'
import { useToggleSheetStore } from '@/stores/useToggleSheetStore'
import { useAuthStore } from '@/stores/useAuthStore'
import { computed } from 'vue'

const store = useToggleSheetStore()
const { setIsOpen } = store

const authStore = useAuthStore()
const route = useRoute()

const filteredLinks = computed(() => {
  if (route.path.startsWith('/dashboard')) {
    if (authStore.user && authStore.user.email_verified_at && authStore.user.role.name === 'admin') {
      return dashboardLinks
    } else {
      return []
    }
  } else {
    if (!authStore.user) {
      return navigationLinks.filter((link) =>
        ['Home', 'Film', 'Cast', 'Genre', 'Film Cast', 'Login', 'Register'].includes(link.name)
      )
    } else if (!authStore.user.email_verified_at) {
      return navigationLinks.filter((link) =>
        ['Home', 'Film', 'Cast', 'Genre', 'Film Cast', 'Verify Account'].includes(link.name)
      )
    } else if (authStore.user.role.name === 'admin') {
      return navigationLinks.filter((link) =>
        ['Home', 'Film', 'Cast', 'Genre', 'Film Cast', 'Update User', 'Profile', 'Dashboard Film'].includes(link.name)
      )
    } else {
      return navigationLinks.filter((link) =>
        ['Home', 'Film', 'Cast', 'Genre', 'Film Cast', 'Update User', 'Profile'].includes(link.name)
      )
    }
  }
})
</script>

<template>
  <RouterLink v-for="link in filteredLinks" :key="link.name" :to="link.path">
    <Button @click="() => setIsOpen(false)" variant="ghost">{{ link.name }}</Button>
  </RouterLink>
</template>

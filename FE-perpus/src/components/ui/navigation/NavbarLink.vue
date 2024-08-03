<script setup>
import { RouterLink, useRoute } from 'vue-router'
import { Button } from '@/components/ui/button'
import { navigationLinks, dashboardLinks } from '@/constant/navigation-link'
import { useToggleSheetStore } from '@/stores/useToggleSheetStore'
import { useAuthStore } from '@/stores/useAuthStore'
import { computed } from 'vue'
// import { storeToRefs } from 'pinia'

const store = useToggleSheetStore()
const { setIsOpen } = store
const { user } = useAuthStore()
// const { user } = storeToRefs(authStore)
const route = useRoute()

const isOwner = user?.role?.name === 'owner'

const filteredLinks = computed(() => {
  if (route.path.startsWith('/dashboard')) {
    if (user && isOwner) {
      return dashboardLinks
    } else {
      return []
    }
  } else {
    if (!user) {
      return navigationLinks.filter((link) =>
        ['Home', 'Book', 'Category', 'Login', 'Register'].includes(link.name)
      )
    } else if (isOwner) {
      return navigationLinks.filter((link) =>
        ['Home', 'Book', 'Category', 'Borrow', 'Profile', 'Dashboard Book'].includes(link.name)
      )
    } else {
      return navigationLinks.filter((link) =>
        ['Home', 'Book', 'Category', 'Borrow', 'Profile'].includes(link.name)
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

<script setup>
import { RouterLink } from 'vue-router'
import { Button } from '@/components/ui/button'
import { navigationLinks } from '@/constant/navigation-link'
import { useToggleSheetStore } from '@/stores/useToggleSheetStore'
import { useAuthStore } from '@/stores/useAuthStore'
import { computed } from 'vue'

const store = useToggleSheetStore()
const { setIsOpen } = store

const authStore = useAuthStore()

const filteredLinks = computed(() => {
  if (!authStore.user)
    return navigationLinks.filter((link) =>
      ['Home', 'Film', 'Cast', 'Genre', 'Login', 'Register'].includes(link.name)
    )
  else if (!authStore.user.email_verified_at)
    return navigationLinks.filter((link) =>
      ['Home', 'Film', 'Cast', 'Genre', 'Verify Account'].includes(link.name)
    )
  else
    return navigationLinks.filter((link) =>
      ['Home', 'Film', 'Cast', 'Genre', 'Profile'].includes(link.name)
    )
})
</script>

<template>
  <RouterLink v-for="link in filteredLinks" :key="link.name" :to="link.path">
    <Button @click="() => setIsOpen(false)" variant="ghost">{{ link.name }}</Button>
  </RouterLink>
</template>

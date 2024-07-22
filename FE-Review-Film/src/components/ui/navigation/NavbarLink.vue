<script setup>
import { RouterLink } from 'vue-router'
import { Button } from '@/components/ui/button'
import { navigationLinks } from '@/constant/navigation-link'
import { useToggleSheetStore } from '@/stores/useToggleSheetStore'

const store = useToggleSheetStore()
const { setIsOpen } = store
</script>
<template>
  <RouterLink v-for="link in navigationLinks" :key="link.name" :to="link.path">
    <Button @click="() => setIsOpen(false)" variant="ghost">{{ link.name }}</Button>
  </RouterLink>
</template>

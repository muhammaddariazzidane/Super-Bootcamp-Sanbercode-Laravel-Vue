<script setup>
import { Button } from '@/components/ui/button'
import { defineProps } from 'vue'
import { useAuthStore } from '@/stores/useAuthStore'
import { useToggleSheetStore } from '@/stores/useToggleSheetStore'

const authStore = useAuthStore()
const store = useToggleSheetStore()
defineProps({
  styleButton: {
    type: String,
    default: '',
    required: false
  }
})
const handleLogout = () => {
  authStore.logout()
}
const { setIsOpen } = store
</script>

<template>
  <Button
    v-if="authStore.user"
    @click="
      () => {
        handleLogout()
        setIsOpen(false)
      }
    "
    variant="destructive"
    :class="styleButton"
  >
    Logout
  </Button>
</template>

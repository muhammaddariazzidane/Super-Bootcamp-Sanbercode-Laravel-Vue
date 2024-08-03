<script setup>
import { useToggleSheetStore } from '@/stores/useToggleSheetStore'
import { useAuthStore } from '@/stores/useAuthStore'
import { Button } from '@/components/ui/button'
import { storeToRefs } from 'pinia'
import { defineProps } from 'vue'

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)
const { logout } = authStore
const { setIsOpen } = useToggleSheetStore()

defineProps({
  styleButton: {
    type: String,
    default: '',
    required: false
  }
})
const handleLogout = async () => await logout()
</script>

<template>
  <Button
    v-if="user"
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

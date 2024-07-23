<script setup>
import { RouterView } from 'vue-router'
import Toaster from '@/components/ui/toast/Toaster.vue'
import { useAuthStore } from '@/stores/useAuthStore'
import { watch } from 'vue'
import { useToast } from '@/components/ui/toast/use-toast'

const { toast } = useToast()

const authStore = useAuthStore()
watch(
  () => authStore.messages.error,
  (message) => {
    if (message) {
      toast({
        description: message,
        variant: 'destructive'
      })
      setTimeout(() => {
        authStore.messages.error = null
      }, 3000)
    }
  }
)
</script>

<template>
  <RouterView v-slot="{ Component, route }">
    <transition :name="route.meta.transition">
      <component :is="Component" />
    </transition>
  </RouterView>
  <Toaster />
</template>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.5s ease;
}

.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
}
</style>

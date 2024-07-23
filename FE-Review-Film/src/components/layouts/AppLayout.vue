<script setup>
import Navbar from '@/components/ui/navigation/Navbar.vue'
import Toaster from '@/components/ui/toast/Toaster.vue'
import { useAuthStore } from '@/stores/useAuthStore'
import { watch } from 'vue'
import { useToast } from '@/components/ui/toast/use-toast'

const { toast } = useToast()

const authStore = useAuthStore()

watch(
  () => authStore.messages.success,
  (message) => {
    if (message) {
      toast({
        description: message
      })
      setTimeout(() => {
        authStore.messages.success = null
      }, 3000)
    }
  }
)

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
  <Navbar />
  <div class="p-4 min-h-screen">
    <Transition name="scale-up">
      <RouterView />
    </Transition>
  </div>
  <footer class="stictky bottom-0 p-4 text-center w-full">
    <p class="font-medium">&copy; 2024 Review Film by Muhammad Dariaz Zidane</p>
  </footer>
  <Toaster />
</template>

<style scoped>
.scale-up-enter-active {
  transition: all 0.5s ease-in-out;
  transform: scale(1);
  opacity: 1;
}

.scale-up-enter-from {
  transform: translateY(30px) scale(0.9);
  opacity: 0;
}

.scale-up-leave-active {
  transition: all 0.5s ease-in-out;
  transform: scale(0.9);
  opacity: 0;
}

.scale-up-leave-to {
  transform: translateY(-30px) scale(0.9);
  opacity: 0;
}
</style>

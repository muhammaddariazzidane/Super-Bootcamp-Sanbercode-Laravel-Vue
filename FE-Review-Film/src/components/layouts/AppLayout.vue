<script setup>
import Navbar from '@/components/ui/navigation/Navbar.vue'
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

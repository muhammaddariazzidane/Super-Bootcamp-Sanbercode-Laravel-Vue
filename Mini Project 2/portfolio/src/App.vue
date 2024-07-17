<script setup>
import { RouterView } from 'vue-router'
import Navbar from '@/components/ui/navigation/Navbar.vue'
import Footer from '@/components/ui/Footer.vue'
import { onMounted } from 'vue'

onMounted(() => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
})
</script>

<template>
  <Navbar />
  <div class="py-5 max-w-6xl mx-auto w-full px-4">
    <Transition name="slide-fade">
      <RouterView />
    </Transition>
  </div>
  <Footer />
</template>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.5s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>

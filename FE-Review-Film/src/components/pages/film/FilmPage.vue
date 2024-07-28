<script setup>
import Cardfilm from '@/components/ui/card-fim/CardFilm.vue'
</script>

<template>
  <main class="max-w-5xl mx-auto">
    <h1 class="py-4 font-semibold text-xl">List Films</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <Cardfilm />
    </div>
  </main>
</template>

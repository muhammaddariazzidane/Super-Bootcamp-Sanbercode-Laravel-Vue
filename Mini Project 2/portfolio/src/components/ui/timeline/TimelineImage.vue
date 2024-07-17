<script setup>
import { defineProps } from 'vue'

defineProps({
  image: String
})
</script>

<template>
  <div class="max-w-12 max-h-12">
    <img
      :src="image"
      :alt="image"
      class="w-full h-full object-cover rounded-sm shadow"
      :class="image === 'https://dariazzidane.vercel.app/img/bangkit.webp' && 'bg-white'"
    />
  </div>
</template>

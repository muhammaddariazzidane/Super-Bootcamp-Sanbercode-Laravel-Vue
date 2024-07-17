<script setup>
import { defineProps } from 'vue'

defineProps({
  title: String,
  university: String,
  company: String,
  study: String,
  period: String
})
</script>
<template>
  <div class="flex flex-col gap-2">
    <h1 class="text-sm font-medium leading-relaxed">
      {{ title ? title : university }}
    </h1>
    <h2 class="text-sm opacity-80 leading-relaxed">
      {{ company ? company : study }}
    </h2>
    <h3 class="text-xs leading-relaxed opacity-80">{{ period }}</h3>
  </div>
</template>

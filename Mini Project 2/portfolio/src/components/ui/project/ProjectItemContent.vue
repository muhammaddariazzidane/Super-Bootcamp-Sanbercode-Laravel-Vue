<script setup>
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { RaGithubLogo } from '@kalimahapps/vue-icons'
import TechItem from '@/components/ui/TechItem.vue'
import { defineProps } from 'vue'

defineProps({
  image: String,
  title: String,
  description: String,
  tech: Array,
  repo: String,
  demo: String
})
</script>

<template>
  <DialogContent>
    <img class="w-full h-full rounded-md" :src="image" :alt="image" loading="lazy" />
    <DialogHeader>
      <DialogTitle class="text-left">{{ title }}</DialogTitle>
    </DialogHeader>
    <DialogDescription>{{ description }}</DialogDescription>
    <div class="flex justify-between gap-6 sm:items-center items-end">
      <ul class="flex items-center flex-wrap gap-3" role="list">
        <TechItem v-for="item in tech" :key="item.id" :value="item.value" :color="item?.color" />
      </ul>
      <div class="flex items-center gap-3">
        <a :href="repo" target="_blank">
          <RaGithubLogo />
        </a>
      </div>
    </div>
  </DialogContent>
</template>

<script setup>
import Detail from '@/components/ui/Detail.vue'
import { defineProps } from 'vue'
const { id, experiences } = defineProps({
  id: String,
  experiences: Array
})
const experienceDetail = experiences.find((experienceDetail) => experienceDetail.id == id)
</script>

<template>
  <main>
    <Detail
      :background-image="experienceDetail.backgroundImage"
      :image="experienceDetail.image"
      :title="experienceDetail.title"
      :company="experienceDetail.company"
      :period="experienceDetail.period"
      :description="experienceDetail.description"
      :skills="experienceDetail.skills"
      :certificates="experienceDetail.certificates"
    />
  </main>
</template>

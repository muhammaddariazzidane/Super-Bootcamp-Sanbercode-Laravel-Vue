<script setup>
import Detail from '@/components/ui/Detail.vue'
import { defineProps } from 'vue'
const { id, educations } = defineProps({
  id: String,
  educations: Array
})
const educationDetail = educations.find((educationDetail) => educationDetail.id == id)
</script>

<template>
  <main>
    <Detail
      :background-image="educationDetail.backgroundImage"
      :image="educationDetail.image"
      :title="educationDetail.title"
      :company="educationDetail.company"
      :period="educationDetail.period"
      :description="educationDetail.description"
      :skills="educationDetail.skills"
      :certificates="educationDetail.certificates"
    />
  </main>
</template>

<script setup>
import educations from '@/data/education.json'
import { useRoute } from 'vue-router'
const {
  params: { id }
} = useRoute()
import EducationDetailPage from '@/components/pages/EducationDetailPage.vue'
</script>

<template>
  <EducationDetailPage :educations="educations" :id="id" />
</template>

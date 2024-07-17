<script setup>
import experiences from '@/data/experience.json'
import { useRoute } from 'vue-router'
const {
  params: { id }
} = useRoute()
import ExperienceDetailPage from '@/components/pages/ExperienceDetailPage.vue'
</script>

<template>
  <ExperienceDetailPage :experiences="experiences" :id="id" />
</template>

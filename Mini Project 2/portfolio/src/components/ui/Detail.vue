<script setup>
import CertificateItem from '@/components/ui/CertificateItem.vue'
import SkillsItem from '@/components/ui/SkillsItem.vue'
import { onMounted } from 'vue'

defineProps({
  backgroundImage: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  university: {
    type: String,
    default: ''
  },
  period: {
    type: String,
    default: ''
  },
  company: {
    type: String,
    default: ''
  },
  study: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  skills: {
    type: Array,
    default: () => []
  },
  certificates: {
    type: Array,
    default: () => []
  }
})

onMounted(() => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
})
</script>

<template>
  <div class="w-full h-full mt-8 relative min-h-screen mb-44">
    <img
      class="w-full h-full object-cover rounded-md"
      :src="backgroundImage"
      :alt="backgroundImage"
      loading="lazy"
    />
    <div class="grid grid-cols-2 md:grid-cols-6 md:gap-4 gap-2">
      <div
        class="md:max-w-[10rem] sm:max-w-20 max-w-12 h-fit md:ml-10 ml-2 -mt-7 sm:-mt-10 md:-mt-14 md:sticky md:top-20"
      >
        <img
          class="w-full h-full object-contain rounded-md"
          :class="image === 'https://dariazzidane.vercel.app/img/bangkit.webp' ? 'bg-white' : ''"
          :src="image"
          :alt="image"
        />
      </div>
      <div class="col-span-5">
        <div class="flex items-center justify-between flex-wrap">
          <h1 class="md:text-2xl text-base font-medium mt-3">{{ title ? title : university }}</h1>
          <p class="text-sm opacity-80 my-2">{{ period }}</p>
        </div>
        <h2 class="mt-1 text-sm md:text-base opacity-90">{{ company ? company : study }}</h2>
        <p class="mt-4 text-sm leading-6 md:text-base">{{ description }}</p>
        <ul
          class="mt-2 marker:text-indigo-500 list-disc list-inside text-sm md:text-base"
          role="list"
        >
          <SkillsItem v-for="skill in skills" :key="skill.id" :name="skill.name" />
        </ul>
        <div class="mt-4">
          <div v-if="certificates?.length !== 0">
            <h1 class="font-medium text-sm md:text-base">Certifications:</h1>
            <div
              class="grid grid-cols-2 min-[400px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 mt-4"
            >
              <CertificateItem v-for="item in certificates" :key="item.id" :item="item" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import CertificateItem from '@/components/ui/CertificateItem.vue'
import { defineProps } from 'vue'
defineProps({
  certifications: Array
})
</script>

<template>
  <main>
    <h1 class="font-semibold sm:text-2xl text-base">My Certifications</h1>
    <div class="max-w-6xl mx-auto">
      <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4 my-8">
        <template v-if="certifications.length !== 0">
          <CertificateItem v-for="item in certifications" :key="item.id" :item="item" />
        </template>
      </div>
    </div>
  </main>
</template>

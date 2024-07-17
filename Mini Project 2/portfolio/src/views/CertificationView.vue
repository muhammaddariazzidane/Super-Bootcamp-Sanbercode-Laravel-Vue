<script setup>
import CertificatePage from '@/components/pages/CertificationPage.vue'
import certifications from '@/data/certificate.json'
</script>

<template>
  <CertificatePage :certifications="certifications" />
</template>

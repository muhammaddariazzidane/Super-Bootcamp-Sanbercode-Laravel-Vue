<script setup>
defineProps({
  name: {
    type: String,
    required: true
  }
})
</script>
<template>
  <li>{{ name }}</li>
</template>

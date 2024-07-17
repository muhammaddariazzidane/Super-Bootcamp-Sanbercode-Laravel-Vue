<script setup>
import { defineProps } from 'vue'

defineProps({
  value: [String, Function],
  color: String
})
</script>

<template>
  <li class="cursor-default">
    <value :color="color" />
  </li>
</template>

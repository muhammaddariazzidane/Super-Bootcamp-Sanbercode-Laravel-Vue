<script setup>
import { defineProps } from 'vue'

defineProps({
  title: String,
  subtitle: String
})
</script>

<template>
  <div class="flex justify-between flex-wrap items-start lg:flex-nowrap gap-3">
    <div>
      <div class="flex items-center gap-2">
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 512 512"
          height="18"
          width="18"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M184 48H328c4.4 0 8 3.6 8 8V96H176V56c0-4.4 3.6-8 8-8zm-56 8V96H64C28.7 96 0 124.7 0 160v96H192 320 512V160c0-35.3-28.7-64-64-64H384V56c0-30.9-25.1-56-56-56H184c-30.9 0-56 25.1-56 56zM512 288H320v32c0 17.7-14.3 32-32 32H224c-17.7 0-32-14.3-32-32V288H0V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V288z"
          ></path>
        </svg>
        <h1 class="font-semibold md:text-lg">{{ title }}</h1>
      </div>
      <h1 class="font-normal md:text-base mt-2">{{ subtitle }}</h1>
    </div>
    <a
      v-if="title === 'Experience'"
      class="flex gap-2 items-start gorup"
      href="https://drive.google.com/file/d/1i74CU89UWWOeSxOGISOj6kyEQDyT9GBR/view?usp=sharing"
      target="_blank"
      ><svg
        stroke="currentColor"
        fill="currentColor"
        stroke-width="0"
        viewBox="0 0 512 512"
        height="19"
        width="19"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"
        ></path>
      </svg>
      <h1 class="text-base font-medium">Download CV</h1>
    </a>
  </div>
</template>

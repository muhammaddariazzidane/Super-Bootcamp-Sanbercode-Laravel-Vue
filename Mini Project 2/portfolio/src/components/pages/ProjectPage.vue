<script setup>
import ProjectItem from '@/components/ui/project/ProjectItem.vue'
import { projects } from '@/components/constant/project-list'
</script>

<template>
  <main>
    <h1 class="font-semibold sm:text-2xl text-base mb-4">My Recent's Projects</h1>
    <div class="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 py-2">
      <ProjectItem v-for="project in projects" :key="project.id" :project="project" />
    </div>
  </main>
</template>

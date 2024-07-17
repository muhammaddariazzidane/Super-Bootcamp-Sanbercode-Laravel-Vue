<script setup>
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import ProjectItemContent from '@/components/ui/project/ProjectItemContent.vue'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import TechItem from '@/components/ui/TechItem.vue'
import { defineProps } from 'vue'

defineProps({
  project: Object
})
</script>

<template>
  <Dialog>
    <DialogTrigger :as-child="true">
      <Card class="shadow-md border-0">
        <CardHeader>
          <img :src="project.image" class="rounded-md" loading="kazy" alt="/" />
        </CardHeader>
        <CardContent class="text-left">
          <h1 class="my-2 md:text-lg font-medium">{{ project.title }}</h1>
          <CardDescription class="line-clamp-2 mb-4">
            {{ project.description }}
          </CardDescription>
          <ul class="flex items-center gap-2" role="list">
            <TechItem
              v-for="item in project.tech.slice(0, 4)"
              :key="item.id"
              :value="item.value"
              :color="item?.color"
            />
          </ul>
        </CardContent>
      </Card>
    </DialogTrigger>
    <ProjectItemContent
      :demo="project.demo"
      :description="project.description"
      :image="project.image"
      :title="project.title"
      :repo="project.repo"
      :tech="project.tech"
    />
  </Dialog>
</template>

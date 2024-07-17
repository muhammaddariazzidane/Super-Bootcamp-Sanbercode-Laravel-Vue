<script setup>
import { useRouter } from 'vue-router'
import { defineProps } from 'vue'
import CarouselItem from '@/components/ui/carousel/CarouselItem.vue'
import TimelineImage from '@/components/ui/timeline/TimelineImage.vue'
import TimelineDescription from '@/components/ui/timeline/TimelineDescription.vue'

defineProps({
  data: Object
})

const router = useRouter()

const handleNavigate = (data) => {
  if (data.company) router.push(`/experience/${data.id}`)
  else router.push(`/education/${data.id}`)
}
</script>

<template>
  <CarouselItem
    class="md:basis-1/2 my-1 hover:scale-95 transition-transform duration-500 cursor-pointer"
    @click="handleNavigate(data)"
  >
    <div class="flex gap-2 p-3 shadow rounded-md">
      <TimelineImage :image="data.image" />
      <TimelineDescription
        :period="data.period"
        :company="data.company"
        :study="data.study"
        :title="data.title"
        :university="data.university"
      />
    </div>
  </CarouselItem>
</template>

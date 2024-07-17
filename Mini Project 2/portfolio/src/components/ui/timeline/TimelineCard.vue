<script setup>
import { defineProps } from 'vue'
import CarouselContent from '@/components/ui/carousel/CarouselContent.vue'
import TimelineHeader from '@/components/ui/timeline/TimelineHeader.vue'
import TimelineItem from '@/components/ui/timeline/TimelineItem.vue'
import Carousel from '@/components/ui/carousel/Carousel.vue'

const props = defineProps({
  title: String,
  icon: String,
  subtitle: String,
  datas: Array
})

const sortedData = props.datas?.sort((a, b) => (b.id ?? 0) - (a.id ?? 0))
</script>

<template>
  <div class="my-4 w-full">
    <TimelineHeader :title="title" :icon="icon" :subtitle="subtitle" />
    <Carousel :opts="{ align: 'start' }" class="w-full my-2 mx-auto">
      <CarouselContent class="px-0.5">
        <TimelineItem v-for="data in sortedData" :key="data.id" :data="data" />
      </CarouselContent>
    </Carousel>
  </div>
</template>

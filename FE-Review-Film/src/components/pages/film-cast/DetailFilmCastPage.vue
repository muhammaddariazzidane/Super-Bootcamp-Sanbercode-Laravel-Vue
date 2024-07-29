<script setup>
import { useFilmCastStore } from '@/stores/useFilmCastStore'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

const { getDetailFilmCast, filmCast, isLoading } = useFilmCastStore()
const route = useRoute()

onMounted(async () => {
  const id = route.params.id

  if (id) await getDetailFilmCast(id)
})
</script>

<template>
  <main class="max-w-5xl mx-auto">
    <h1 v-if="isLoading">Loading...</h1>
    <Card v-else class="cursor-pointer shadow-none border-0">
      <CardContent>
        <CardHeader>
          <CardTitle>{{ filmCast.name }}</CardTitle>
          <img :src="filmCast.movie?.poster" :alt="filmCast.title" class="rounded-md mt-2" />
        </CardHeader>
        <CardFooter class="flex flex-col items-start justify-end gap-3">
          <p class="text-base font-medium">Movie Detail:</p>
          <ul class="list-disc px-4">
            <li>Title: {{ filmCast.movie?.title }}</li>
            <li>Summary: {{ filmCast.movie?.summary }}</li>
            <li>Year: {{ filmCast.movie?.year }}</li>
          </ul>
          <p class="text-base font-medium">Cast Detail:</p>
          <ul class="list-disc px-4">
            <li>Name: {{ filmCast.cast?.name }}</li>
            <li>Age: {{ filmCast.cast?.age }}</li>
            <li>Bio: {{ filmCast.cast?.bio }}</li>
          </ul>
        </CardFooter>
      </CardContent>
    </Card>
  </main>
</template>

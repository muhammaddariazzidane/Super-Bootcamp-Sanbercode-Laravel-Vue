<script setup>
import { onMounted } from 'vue'
import { useFilmCastStore } from '@/stores/useFilmCastStore'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { RouterLink } from 'vue-router'
import { Button } from '@/components/ui/button'

const { getFilmCasts, filmCasts } = useFilmCastStore()
onMounted(async () => {
  await getFilmCasts()
})
</script>

<template>
  <main class="max-w-5xl mx-auto">
    <h1 class="py-4 font-semibold text-xl">List Film Cast</h1>
    <h1 class="py-6 text-center" v-if="filmCasts.length < 1">No data available</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <Card v-for="(filmCast, index) in filmCasts" :key="index" class="cursor-pointer">
        <CardHeader>
          <CardTitle>{{ filmCast.name }}</CardTitle>
          <img :src="filmCast.movie.poster" :alt="filmCast.title" class="rounded-md mt-2" />
        </CardHeader>
        <CardContent>
          <CardDescription>{{ filmCast.movie.summary }}</CardDescription>
        </CardContent>
        <CardFooter class="flex flex-col items-start justify-end gap-3">
          <p class="text-sm">Movie: {{ filmCast.movie.title }}</p>
          <p class="text-sm">Cast: {{ filmCast.cast.name }}</p>
          <RouterLink :to="{ name: 'Film Cast Detail', params: { id: filmCast.id } }">
            <Button size="sm">Detail</Button>
          </RouterLink>
        </CardFooter>
      </Card>
    </div>
  </main>
</template>

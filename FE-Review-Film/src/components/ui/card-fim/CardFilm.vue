<script setup>
import { useFilmStore } from '@/stores/useFilmStore'
import { Button } from '@/components/ui/button'
import { RouterLink } from 'vue-router'
import { onMounted } from 'vue'
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
const { films, isLoading, getFilms } = useFilmStore()

onMounted(async () => {
  await getFilms()
})
</script>

<template>
  <div v-if="isLoading" class="flex justify-center items-center">
    <p>Loading...</p>
  </div>
  <h1 class="py-6 text-center" v-if="films.length < 1">No data available</h1>
  <Card v-for="film in films" :key="film.id" class="cursor-pointer">
    <CardHeader>
      <CardTitle>{{ film.title }}</CardTitle>
      <img :src="film.poster" :alt="film.title" class="rounded-md mt-2" />
    </CardHeader>
    <CardContent>
      <CardDescription>{{ film.summary }}</CardDescription>
    </CardContent>
    <CardFooter class="flex flex-col items-start justify-end gap-3">
      <p class="text-sm" v-if="film.genre">Genre: {{ film.genre.name }}</p>
      <p class="text-sm">Year: {{ film.year }}</p>
      <RouterLink :to="{ name: 'Film Detail', params: { id: film.id } }">
        <Button size="sm">Detail</Button>
      </RouterLink>
    </CardFooter>
  </Card>
</template>

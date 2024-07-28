<script setup>
import { Card, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { Button } from '@/components/ui/button'
import { useGenreStore } from '@/stores/useGenreStore'

const { genres, getGenres, isLoading } = useGenreStore()

onMounted(async () => {
  await getGenres()
})
</script>

<template>
  <main class="max-w-5xl mx-auto">
    <h1 class="py-4 font-semibold text-xl">List Genres</h1>
    <h1 v-if="isLoading" class="py-6 text-center">loading....</h1>
    <h1 class="py-6 text-center" v-if="genres.length < 1">No data available</h1>
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <Card v-for="(genre, index) in genres" :key="index" class="cursor-pointer">
        <CardHeader>
          <CardTitle>{{ genre.name }}</CardTitle>
        </CardHeader>
        <CardFooter>
          <RouterLink :to="{ name: 'Genre Detail', params: { id: genre.id } }">
            <Button size="sm" variant="secondary">Detail</Button>
          </RouterLink>
        </CardFooter>
      </Card>
    </div>
  </main>
</template>

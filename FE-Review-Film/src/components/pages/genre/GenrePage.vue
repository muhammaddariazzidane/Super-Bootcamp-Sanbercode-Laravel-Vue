<script setup>
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
const genres = [
  {
    id: 1,
    name: 'Action',
    description: 'High-paced movies with a lot of excitement and adventure.'
  },
  {
    id: 2,
    name: 'Comedy',
    description: 'Movies designed to make you laugh.'
  },
  {
    id: 3,
    name: 'Drama',
    description: 'Movies that focus on character development and emotional themes.'
  },
  {
    id: 4,
    name: 'Fantasy',
    description: 'Movies set in magical worlds with supernatural elements.'
  },
  {
    id: 5,
    name: 'Horror',
    description: 'Movies designed to scare and thrill you.'
  },
  {
    id: 6,
    name: 'Romance',
    description: 'Movies that focus on romantic relationships.'
  },
  {
    id: 7,
    name: 'Sci-Fi',
    description: 'Movies that explore futuristic and scientific themes.'
  },
  {
    id: 8,
    name: 'Thriller',
    description: 'Movies full of suspense and excitement.'
  },
  {
    id: 9,
    name: 'Animation',
    description: 'Movies created using animation techniques.'
  },
  {
    id: 10,
    name: 'Documentary',
    description: 'Movies that document real-life events and stories.'
  }
]
</script>

<template>
  <main class="max-w-5xl mx-auto">
    <h1 class="py-4 font-semibold text-xl">List Genres</h1>
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <Card v-for="(genre, index) in genres" :key="index" class="cursor-pointer">
        <CardHeader>
          <CardTitle>{{ genre.name }}</CardTitle>
          <CardDescription>{{ genre.description }}</CardDescription>
        </CardHeader>
      </Card>
    </div>
  </main>
</template>

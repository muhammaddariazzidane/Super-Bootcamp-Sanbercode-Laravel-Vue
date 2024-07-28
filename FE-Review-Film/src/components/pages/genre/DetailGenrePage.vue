<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import CardFilm from '@/components/ui/card-fim/CardFilm.vue'
import { useGenreStore } from '@/stores/useGenreStore'

const route = useRoute()
const { getDetailGenre, genre, isLoading } = useGenreStore()

onMounted(async () => {
  const id = route.params.id
  if (id) await getDetailGenre(id)
})
</script>

<template>
  <main class="max-w-5xl mx-auto w-full">
    <h1 v-if="isLoading">Loading...</h1>
    <div v-else>
      <h1>Genre: {{ genre.name }}</h1>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-5 lg:grid-cols-4 gap-4">
        <CardFilm />
      </div>
    </div>
  </main>
</template>

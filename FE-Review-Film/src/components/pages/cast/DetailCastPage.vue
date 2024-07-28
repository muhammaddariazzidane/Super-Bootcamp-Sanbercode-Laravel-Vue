<script setup>
import { useCastStore } from '@/stores/useCastStore'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import CardFilm from '@/components/ui/card-fim/CardFilm.vue'

const { cast, getDetailCast, isLoading } = useCastStore()
const route = useRoute()

onMounted(async () => {
  const id = route.params.id

  if (id) await getDetailCast(id)
})
</script>

<template>
  <main class="max-w-5xl mx-auto w-full">
    <h1 v-if="isLoading">Loading...</h1>
    <div v-else>
      <h1>Cast: {{ cast.name }}</h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-5 lg:grid-cols-4 gap-4">
        <CardFilm />
      </div>
    </div>
  </main>
</template>

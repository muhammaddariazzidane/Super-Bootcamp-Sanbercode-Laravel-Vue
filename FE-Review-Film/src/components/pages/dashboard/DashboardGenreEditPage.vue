<script setup>
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { reactive, onMounted } from 'vue'
import { useGenreStore } from '@/stores/useGenreStore'
import { Button } from '@/components/ui/button'
import { useRoute } from 'vue-router'

const route = useRoute()
const { getDetailGenre, genre, updateGenre } = useGenreStore()

const id = route.params.id

onMounted(async() => {
  if (id) await getDetailGenre(id)
})

const updateGenreInputs = reactive({
  name: genre.name,
})

const handleUpdateGenre = async () => {
  await updateGenre(id, updateGenreInputs)
}

</script>

<template>
  <main class="max-w-4xl mx-auto">
    <h1 class="text-2xl text-center font-medium py-4">Edit Genre</h1>
    <form class="flex flex-col gap-4" @submit.prevent="handleUpdateGenre">
      <Label for="name">Name</Label>
      <Input
        type="text"
        id="name"
        name="name"
        placeholder="Genre name"
        v-model="updateGenreInputs.name"
        required
      />
      <Button type="submit" class="mt-4">Save</Button>
    </form>
  </main>
</template>

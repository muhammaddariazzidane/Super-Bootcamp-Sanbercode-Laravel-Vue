<script setup>
import { useFilmStore } from '@/stores/useFilmStore'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardContent
} from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { reactive } from 'vue'
import { Input } from '@/components/ui/input'
const route = useRoute()
const { film, getDetailFilm, createReview, isLoading } = useFilmStore()

const reviewInputs = reactive({
  critic: '',
  rating: null,
  movie_id: route.params.id ?? null
})

onMounted(async () => {
  const id = route.params.id
  if (id) await getDetailFilm(id)
})

const handleReview = async () => {
  await createReview(reviewInputs)
}
</script>

<template>
  <main class="max-w-4xl mx-auto w-full">
    <h1 v-if="isLoading">Loading...</h1>
    <Card>
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
        <h1 class="py-2 font-medium">List Cast</h1>
        <ul class="list-disc px-4" v-for="cast in film.list_cast" :key="cast.id">
          <li>{{ cast.name }}</li>
        </ul>
      </CardFooter>
    </Card>
    <div class="py-4">
      <form @submit.prevent="handleReview">
        <Input
          type="number"
          class="w-fit mb-3"
          required
          v-model="reviewInputs.rating"
          placeholder="Rating"
        />
        <Textarea
          name="critic"
          v-model="reviewInputs.critic"
          required
          placeholder="Write your review here"
        />
        <Button type="submit" class="mt-4"> Review </Button>
      </form>
      <div class="py-4 flex gap-4 items-center">
        <Card v-for="review in film.list_reviews" :key="review.id">
          <CardHeader>
            <CardTitle>{{ review.critic }}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>⭐: {{ review.rating }}</CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  </main>
</template>

<script setup>
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { reactive, onMounted } from 'vue'
import { useFilmStore } from '@/stores/useFilmStore'
import { Button } from '@/components/ui/button'
import { useRoute } from 'vue-router'
import { Check, ChevronsUpDown } from 'lucide-vue-next'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ref } from 'vue'
import { cn } from '@/lib/utils'
import { useGenreStore } from '@/stores/useGenreStore'
import { Textarea } from '@/components/ui/textarea'

const open = ref(false)
const route = useRoute()
const { getDetailFilm, film, updateFilm } = useFilmStore()
const { genres, getGenres } = useGenreStore()

onMounted(async () => {
  const id = route.params.id
  if (id) {
    await getDetailFilm(id)
    await getGenres()
  }
})
const updateFilmInputs = reactive({
  title: film.title,
  summary: film.summary,
  year: film.year,
  poster: film.poster,
  genre_id: film.genre_id
})

const handleUpdateFilm = async () => {
  await updateFilm(route.params?.id, updateFilmInputs)
}
</script>

<template>
  <main class="max-w-4xl mx-auto">
    <h1 class="text-2xl text-center font-medium py-4">Edit Film</h1>
    <form class="flex flex-col gap-3" @submit.prevent="handleUpdateFilm">
      <Label for="title">Title</Label>
      <Input
        type="text"
        id="title"
        name="title"
        placeholder="title"
        v-model="updateFilmInputs.title"
      />
      <Label for="year">Year</Label>
      <Input type="text" id="year" name="year" placeholder="Year" v-model="updateFilmInputs.year" />
      <Label for="genre"
        >Genre
        <Popover v-model:open="open">
          <PopoverTrigger as-child>
            <Button variant="outline" role="combobox" :aria-expanded="open" class="w-full">
              {{
                updateFilmInputs.genre_id
                  ? genres.find((genre) => genre.id === updateFilmInputs.genre_id)?.name
                  : 'Select genre...'
              }}
              <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent class="w-[200px] p-0">
            <Command>
              <CommandInput class="h-9" placeholder="Search genre..." />
              <CommandEmpty>No genre found.</CommandEmpty>
              <CommandList>
                <CommandGroup>
                  <CommandItem
                    v-for="genre in genres"
                    :key="genre.id"
                    :value="genre.id"
                    @select="
                      (ev) => {
                        updateFilmInputs.genre_id = ev.detail.value
                        open = false
                      }
                    "
                  >
                    {{ genre.name }}
                    <Check
                      :class="
                        cn(
                          'ml-auto h-4 w-4',
                          updateFilmInputs.genre_id === genre.id ? 'opacity-100' : 'opacity-0'
                        )
                      "
                    />
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </Label>
      <Label for="poster">Poster</Label>
      <Input
        type="file"
        id="poster"
        name="poster"
        placeholder="Poster"
        @change="(e) => (updateFilmInputs.poster = e.target.files[0])"
      />
      <Label for="summary">Summary</Label>
      <Textarea
        id="summary"
        name="summary"
        placeholder="Summary"
        v-model="updateFilmInputs.summary"
      />

      <Button type="submit" class="mt-4">Save</Button>
    </form>
  </main>
</template>

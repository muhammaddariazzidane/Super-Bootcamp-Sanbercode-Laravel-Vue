<script setup>
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { reactive, onMounted, ref } from 'vue'
import { useFilmCastStore } from '@/stores/useFilmCastStore'
import { Button } from '@/components/ui/button'
import { useRoute } from 'vue-router'
import { useCastStore } from '@/stores/useCastStore'
import { useFilmStore } from '@/stores/useFilmStore'
import { cn } from '@/lib/utils'
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

const openCast = ref(false)
const openMovie = ref(false)
const route = useRoute()
const { getDetailFilmCast, filmCast, updateFilmCast } = useFilmCastStore()
const { casts, getCasts } = useCastStore()
const { films, getFilms } = useFilmStore()

const id = route.params.id

onMounted(async () => {
  if (id) {
    await getDetailFilmCast(id)
    await getCasts()
    await getFilms()
  }
})

const updateFilmCastInputs = reactive({
  name: filmCast.name,
  cast_id: filmCast.cast_id,
  movie_id: filmCast.movie_id
})

const handleUpdateFilmCast = async () => {
  await updateFilmCast(id, updateFilmCastInputs)
}
</script>

<template>
  <main class="max-w-4xl mx-auto">
    <h1 class="text-2xl text-center font-medium py-4">Edit Film Cast</h1>
    <form class="flex flex-col gap-4" @submit.prevent="handleUpdateFilmCast">
      <Label for="name">Name</Label>
      <Input
        type="text"
        id="name"
        name="name"
        placeholder="Name"
        v-model="updateFilmCastInputs.name"
      />
      <Label for="cast"> Cast </Label>
      <Popover v-model:open="openCast">
        <PopoverTrigger as-child>
          <Button variant="outline" role="combobox" :aria-expanded="openCast" class="w-full">
            {{
              updateFilmCastInputs.cast_id
                ? casts.find((cast) => cast.id === updateFilmCastInputs.cast_id)?.name
                : 'Select cast...'
            }}
            <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent class="w-[200px] p-0">
          <Command>
            <CommandInput class="h-9" placeholder="Search cast..." />
            <CommandEmpty>No cast found.</CommandEmpty>
            <CommandList>
              <CommandGroup>
                <CommandItem
                  v-for="cast in casts"
                  :key="cast.id"
                  :value="cast.id"
                  @select="
                    (ev) => {
                      updateFilmCastInputs.cast_id = ev.detail.value
                      openCast = false
                    }
                  "
                >
                  {{ cast.name }}
                  <Check
                    :class="
                      cn(
                        'ml-auto h-4 w-4',
                        updateFilmCastInputs.cast_id === cast.id ? 'opacity-100' : 'opacity-0'
                      )
                    "
                  />
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <Label for="movie"> Movie </Label>

      <Popover v-model:open="openMovie">
        <PopoverTrigger as-child>
          <Button variant="outline" role="combobox" :aria-expanded="openMovie" class="w-full">
            {{
              updateFilmCastInputs.movie_id
                ? films.find((movie) => movie.id === updateFilmCastInputs.movie_id)?.title
                : 'Select movie...'
            }}
            <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent class="w-[200px] p-0">
          <Command>
            <CommandInput class="h-9" placeholder="Search movie..." />
            <CommandEmpty>No movie found.</CommandEmpty>
            <CommandList>
              <CommandGroup>
                <CommandItem
                  v-for="film in films"
                  :key="film.id"
                  :value="film.id"
                  @select="
                    (ev) => {
                      updateFilmCastInputs.movie_id = ev.detail.value
                      openMovie = false
                    }
                  "
                >
                  {{ film.title }}
                  <Check
                    :class="
                      cn(
                        'ml-auto h-4 w-4',
                        updateFilmCastInputs.movie_id === film.id ? 'opacity-100' : 'opacity-0'
                      )
                    "
                  />
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Button type="submit" class="mt-4">Save</Button>
    </form>
  </main>
</template>

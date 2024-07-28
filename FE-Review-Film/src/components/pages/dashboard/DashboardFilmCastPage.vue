<script setup>
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { useFilmStore } from '@/stores/useFilmStore'
import { onMounted, reactive, ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Check, ChevronsUpDown } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useCastStore } from '@/stores/useCastStore'
import { useFilmCastStore } from '@/stores/useFilmCastStore'
import { RouterLink } from 'vue-router'
import { PencilLine } from 'lucide-vue-next'
import { TrashIcon } from 'lucide-vue-next'
import { useToggleSheetStore } from '@/stores/useToggleSheetStore'
import { storeToRefs } from 'pinia'

const openCast = ref(false)
const openMovie = ref(false)
const store = useToggleSheetStore()
const { modalOpen } = storeToRefs(store)
const { setIsModalOpen } = store

const { getFilms, films } = useFilmStore()
const { getFilmCasts, filmCasts, deleteFilmCast, createFilmCast, isLoading } = useFilmCastStore()
const { getCasts, casts } = useCastStore()

const createFilmCastInputs = reactive({
  name: '',
  cast_id: '',
  movie_id: ''
})

const handleCreateFilmCast = async () => {
  await createFilmCast(createFilmCastInputs)
  setIsModalOpen(false)
}

onMounted(async () => {
  await getFilmCasts()
  await getFilms()
  await getCasts()
})
</script>

<template>
  <main class="max-w-5xl mx-auto">
    <h1 v-if="isLoading">Loading...</h1>
    <div v-else>
      <Dialog :open="modalOpen">
        <DialogTrigger class="py-5"><Button  @click="setIsModalOpen(true)" >Create Film Cast</Button></DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create new Film Cast</DialogTitle>
            <DialogDescription>Fill the form below to create a new film cast.</DialogDescription>
          </DialogHeader>
          <form class="flex flex-col gap-3" @submit.prevent="handleCreateFilmCast">
            <Label for="name">Name</Label>
            <Input
              type="text"
              id="name"
              name="name"
              placeholder="name"
              v-model="createFilmCastInputs.name"
            />

            <Label for="cast">
              Cast
              <Popover v-model:open="openCast">
                <PopoverTrigger as-child>
                  <Button
                    variant="outline"
                    role="combobox"
                    :aria-expanded="openCast"
                    class="w-full"
                  >
                    {{
                      createFilmCastInputs.cast_id
                        ? casts.find((cast) => cast.id === createFilmCastInputs.cast_id)?.name
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
                              createFilmCastInputs.cast_id = ev.detail.value
                              openCast = false
                            }
                          "
                        >
                          {{ cast.name }}
                          <Check
                            :class="
                              cn(
                                'ml-auto h-4 w-4',
                                createFilmCastInputs.cast_id === cast.id
                                  ? 'opacity-100'
                                  : 'opacity-0'
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

            <Label for="movie">
              Movie
              <Popover v-model:open="openMovie">
                <PopoverTrigger as-child>
                  <Button
                    variant="outline"
                    role="combobox"
                    :aria-expanded="openMovie"
                    class="w-full"
                  >
                    {{
                      createFilmCastInputs.movie_id
                        ? films.find((movie) => movie.id === createFilmCastInputs.movie_id)?.title
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
                              createFilmCastInputs.movie_id = ev.detail.value
                              openMovie = false
                            }
                          "
                        >
                          {{ film.title }}
                          <Check
                            :class="
                              cn(
                                'ml-auto h-4 w-4',
                                createFilmCastInputs.movie_id === film.id
                                  ? 'opacity-100'
                                  : 'opacity-0'
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

            <DialogFooter>
              <Button type="submit" class="mt-4">Create</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <Table>
        <TableCaption v-if="filmCasts.length < 1">
          You have not created any film cast yet.
        </TableCaption>
        <TableCaption v-else>A list of your recent film cast.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead class="w-[15rem]">Name</TableHead>
            <TableHead>Cast</TableHead>
            <TableHead>Movie</TableHead>
            <TableHead class="text-end">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="filmCast in filmCasts" :key="filmCast.id">
            <TableCell>{{ filmCast.name }}</TableCell>
            <TableCell>{{ filmCast.cast.name }}</TableCell>
            <TableCell>{{ filmCast.movie.title }}</TableCell>
            <TableCell class="flex items-center gap-2 justify-end">
              <RouterLink :to="{ name: 'Dashboard Film Cast Edit', params: { id: filmCast.id } }">
                <Button size="icon" variant="secondary">
                  <PencilLine />
                </Button>
              </RouterLink>
              <Button size="icon" variant="destructive" @click="() => deleteFilmCast(filmCast.id)">
                <TrashIcon />
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </main>
</template>

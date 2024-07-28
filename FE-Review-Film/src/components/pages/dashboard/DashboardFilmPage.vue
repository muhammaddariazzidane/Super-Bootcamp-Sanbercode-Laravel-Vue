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
import { onMounted, reactive } from 'vue'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useGenreStore } from '@/stores/useGenreStore'
import { ref } from 'vue'
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
import { RouterLink } from 'vue-router'
import { PencilLine } from 'lucide-vue-next'
import { TrashIcon } from 'lucide-vue-next'
import { useToggleSheetStore } from '@/stores/useToggleSheetStore'
import { storeToRefs } from 'pinia'

const open = ref(false)
const store = useToggleSheetStore()
const { modalOpen } = storeToRefs(store)
const { setIsModalOpen } = store
const { getFilms, films, createFilm, deleteFilm, isLoading } = useFilmStore()
const { genres, getGenres } = useGenreStore()

const createFilmInputs = reactive({
  title: '',
  summary: '',
  year: '',
  poster: null,
  genre_id: ''
})

const handleCreateFilm = async () => {
  await createFilm(createFilmInputs)
  setIsModalOpen(false)
}

onMounted(async () => {
  await getFilms()
  await getGenres()
})
</script>

<template>
  <main class="max-w-5xl mx-auto">
    <h1 v-if="isLoading">Loading...</h1>
    <div v-else>
      <Dialog :open="modalOpen" >
        <DialogTrigger class="py-5"><Button @click="setIsModalOpen(true)" >Create Film</Button></DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create new Film</DialogTitle>
            <DialogDescription>Fill the form below to create a new film.</DialogDescription>
          </DialogHeader>
          <form class="flex flex-col gap-3" @submit.prevent="handleCreateFilm">
            <Label for="title">Title</Label>
            <Input
              type="text"
              id="title"
              name="title"
              placeholder="title"
              v-model="createFilmInputs.title"
            />
            <Label for="year">Year</Label>
            <Input
              type="text"
              id="year"
              name="year"
              placeholder="Year"
              v-model="createFilmInputs.year"
            />
            <Label for="genre"
              >Genre
              <Popover v-model:open="open">
                <PopoverTrigger as-child>
                  <Button variant="outline" role="combobox" :aria-expanded="open" class="w-full">
                    {{
                      createFilmInputs.genre_id
                        ? genres.find((genre) => genre.id === createFilmInputs.genre_id)?.name
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
                              createFilmInputs.genre_id = ev.detail.value
                              open = false
                            }
                          "
                        >
                          {{ genre.name }}
                          <Check
                            :class="
                              cn(
                                'ml-auto h-4 w-4',
                                createFilmInputs.genre_id === genre.id ? 'opacity-100' : 'opacity-0'
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
              @change="(e) => (createFilmInputs.poster = e.target.files[0])"
            />
            <Label for="summary">Summary</Label>
            <Textarea
              id="summary"
              name="summary"
              placeholder="Summary"
              v-model="createFilmInputs.summary"
            />

            <DialogFooter>
              <Button type="submit" class="mt-4">Create</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <Table>
        <TableCaption v-if="films?.length < 1"> You have not created any films yet. </TableCaption>
        <TableCaption v-else>A list of your recent films.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead >Title</TableHead>
            <TableHead class="w-[15rem]">Summary</TableHead>
            <TableHead>Genre</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>Poster</TableHead>
            <TableHead class="text-end">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="film in films" :key="film.id">
            <TableCell>{{ film.title }}</TableCell>
            <TableCell>{{ film.summary }}</TableCell>
            <TableCell>{{ film?.genre?.name }}</TableCell>
            <TableCell>{{ film.year }}</TableCell>
            <TableCell>
              <img :src="film.poster" width="50" height="50" :alt="film.poster" loading="lazy" />
            </TableCell>
            <TableCell class="flex items-center gap-2 justify-end">
              <RouterLink :to="{ name: 'Dashboard Film Edit', params: { id: film.id } }">
                <Button size="icon" variant="secondary">
                  <PencilLine />
                </Button>
              </RouterLink>
              <Button size="icon" variant="destructive" @click="() => deleteFilm(film.id)">
                <TrashIcon />
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </main>
</template>

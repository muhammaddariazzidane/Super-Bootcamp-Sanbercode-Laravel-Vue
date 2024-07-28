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
import { useGenreStore } from '@/stores/useGenreStore'
import { onMounted, ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { TrashIcon } from 'lucide-vue-next'
import { PencilLine } from 'lucide-vue-next'
import { useToggleSheetStore } from '@/stores/useToggleSheetStore'
import { storeToRefs } from 'pinia'

const { getGenres, genres, createGenre, deleteGenre, isLoading } = useGenreStore()

const name = ref('')
const store = useToggleSheetStore()
const { modalOpen } = storeToRefs(store)
const { setIsModalOpen } = store

const handleCreateRole = async () => {
  await createGenre(name.value)
  setIsModalOpen(false)
}

onMounted(async () => {
  await getGenres()
})
</script>

<template>
  <main class="max-w-5xl mx-auto">
    <h1 v-if="isLoading">Loading...</h1>
    <div v-else>
      <Dialog :open="modalOpen">
        <DialogTrigger class="py-5"><Button @click="setIsModalOpen(true)" >Create Genre</Button></DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create new Genre</DialogTitle>
            <DialogDescription>Fill the form below to create a new genre.</DialogDescription>
          </DialogHeader>
          <form @submit.prevent="handleCreateRole">
            <Label for="name">Name</Label>
            <Input type="text" id="name" name="name" placeholder="Genre name" v-model="name" />
            <DialogFooter>
              <Button type="submit" class="mt-4">Create</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <Table>
        <TableCaption v-if="genres.length < 1"> You have not created any genres yet. </TableCaption>
        <TableCaption v-else>A list of your recent genres.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead class="w-[15rem]">Name</TableHead>
            <TableHead class="text-end">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="(genre, index) in genres" :key="index">
            <TableCell>{{ genre.name }}</TableCell>
            <TableCell class="flex items-center gap-2 justify-end">
              <RouterLink
                :to="{
                  name: 'Dashboard Genre Edit',
                  params: { id: genre.id }
                }"
              >
                <Button size="icon" variant="secondary">
                  <PencilLine />
                </Button>
              </RouterLink>
              <Button size="icon" variant="destructive" @click="() => deleteGenre(genre.id)">
                <TrashIcon />
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </main>
</template>

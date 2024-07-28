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
import { useCastStore } from '@/stores/useCastStore'
import { onMounted, reactive } from 'vue'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { RouterLink } from 'vue-router'
import { PencilLine } from 'lucide-vue-next'
import { TrashIcon } from 'lucide-vue-next'
import { useToggleSheetStore } from '@/stores/useToggleSheetStore'
import { storeToRefs } from 'pinia'

const { getCasts, casts, isLoading, deleteCast, createCast } = useCastStore()

const store = useToggleSheetStore()
const { modalOpen } = storeToRefs(store)
const { setIsModalOpen } = store

const createCastInputs = reactive({
  name: '',
  age: '',
  bio: ''
})

onMounted(async () => {
  await getCasts()
})

const handleCreateCast = async () => {
  await createCast(createCastInputs)
  setIsModalOpen(false)
}
</script>

<template>
  <main class="max-w-5xl mx-auto">
    <h1 v-if="isLoading">Loading...</h1>
    <div v-else>
      <Dialog :open="modalOpen">
        <DialogTrigger class="py-5">
          <Button @click="setIsModalOpen(true)">Create Cast</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create new Cast</DialogTitle>
            <DialogDescription>Fill the form below to create a new cast.</DialogDescription>
          </DialogHeader>
          <form @submit.prevent="handleCreateCast">
            <Label for="name">Name</Label>
            <Input
              type="text"
              id="name"
              name="name"
              placeholder="Cast name"
              v-model="createCastInputs.name"
            />
            <Label for="age">Age</Label>
            <Input
              type="number"
              id="age"
              name="age"
              placeholder="Cast age"
              v-model="createCastInputs.age"
            />
            <Label for="bio">Bio</Label>
            <Textarea id="bio" name="bio" placeholder="Cast bio" v-model="createCastInputs.bio" />
            <DialogFooter>
              <Button type="submit" class="mt-4">Create</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Table>
        <TableCaption v-if="casts.length < 1"> You have not created any casts yet. </TableCaption>
        <TableCaption v-else>A list of your recent casts.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead class="w-[15rem]">Name</TableHead>
            <TableHead class="w-[40rem]">Bio</TableHead>
            <TableHead>Age</TableHead>
            <TableHead class="text-end">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="(cast, index) in casts" :key="index">
            <TableCell>{{ cast.name }}</TableCell>
            <TableCell>{{ cast.bio }}</TableCell>
            <TableCell>{{ cast.age }}</TableCell>
            <TableCell class="flex items-center gap-2">
              <RouterLink :to="{ name: 'Dashboard Cast Edit', params: { id: cast.id } }">
                <Button size="icon" variant="secondary">
                  <PencilLine />
                </Button>
              </RouterLink>
              <Button size="icon" variant="destructive" @click="() => deleteCast(cast.id)">
                <TrashIcon />
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </main>
</template>

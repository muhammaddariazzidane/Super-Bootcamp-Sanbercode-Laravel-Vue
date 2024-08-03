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
import { useToggleSheetStore } from '@/stores/useToggleSheetStore'
import { useCategoryStore } from '@/stores/useCategoryStore'
import { useLoadingStore } from '@/stores/useLoadingStore'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { PencilLine } from 'lucide-vue-next'
import { Trash2 } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'

const name = ref('')
const { loading } = storeToRefs(useLoadingStore())
const { modalOpen } = storeToRefs(useToggleSheetStore())
const { setIsModalOpen } = useToggleSheetStore()
const categoryStore = useCategoryStore()
const { categories } = storeToRefs(categoryStore)
const { createCategory, deleteCategory, getCategories } = categoryStore

const handleCreateCategory = async () => await createCategory(name)

onMounted(async () => {
  await getCategories()
})
</script>

<template>
  <main class="max-w-5xl mx-auto">
    <div>
      <Dialog :open="modalOpen">
        <DialogTrigger class="py-5"
          ><Button @click="setIsModalOpen(true)">Create Category</Button></DialogTrigger
        >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create new Category</DialogTitle>
            <DialogDescription>Fill the form below to create a new category.</DialogDescription>
          </DialogHeader>
          <form @submit.prevent="handleCreateCategory">
            <Label for="name">Name</Label>
            <Input type="text" id="name" name="name" placeholder="category name" v-model="name" />
            <DialogFooter>
              <Button type="submit" class="mt-4" :disabled="loading">Create</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <Table>
        <TableCaption v-if="categories.length < 1 && !loading">
          You have not created any categories yet.
        </TableCaption>
        <TableCaption v-else-if="loading">Loading...</TableCaption>
        <TableCaption v-else>A list of your recent categories.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead class="w-[15rem]">Name</TableHead>
            <TableHead class="text-end">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="category in categories" :key="category.id">
            <TableCell>{{ category.name }}</TableCell>
            <TableCell class="flex items-center gap-2 justify-end">
              <RouterLink
                :to="{
                  name: 'Dashboard Category Edit',
                  params: { id: category.id },
                  query: { name: category.name }
                }"
              >
                <Button size="icon" variant="secondary" :disabled="loading">
                  <PencilLine />
                </Button>
              </RouterLink>
              <Button
                size="icon"
                variant="destructive"
                :disabled="loading"
                @click="
                  () => {
                    deleteCategory(category.id)
                  }
                "
              >
                <Trash2 />
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </main>
</template>

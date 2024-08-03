<script setup>
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useCategoryStore } from '@/stores/useCategoryStore'
import { Check, ChevronsUpDown } from 'lucide-vue-next'
import { useBookStore } from '@/stores/useBookStore'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { reactive, onMounted, ref } from 'vue'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { cn } from '@/lib/utils'

const categoryStore = useCategoryStore()
const bookStore = useBookStore()
const route = useRoute()
const { id } = route.params
const { getBook, updateBook } = bookStore
const { book } = storeToRefs(bookStore)
const { categories } = storeToRefs(categoryStore)
const { getCategories } = categoryStore

const updateBookInputs = reactive({
  title: '',
  stok: '',
  summary: '',
  image: '',
  category_id: ''
})

const open = ref(false)

onMounted(async () => {
  await getBook(id)
  await getCategories()
  Object.assign(updateBookInputs, {
    title: book.value.title,
    stok: book.value.stok,
    summary: book.value.summary,
    image: book.value.image,
    category_id: book.value.category_id
  })
})

const handleUpdateBook = async () => await updateBook(updateBookInputs, id)
</script>

<template>
  <main class="max-w-md mx-auto">
    <h1 class="text-2xl text-center font-medium py-4">Edit Book</h1>
    <form class="flex flex-col gap-4" @submit.prevent="handleUpdateBook">
      <Label for="title">Title</Label>
      <Input
        type="text"
        id="title"
        name="title"
        placeholder="Title"
        v-model="updateBookInputs.title"
      />
      <Label for="stok">Stok</Label>
      <Input
        type="number"
        id="stok"
        name="stok"
        placeholder="stok"
        v-model="updateBookInputs.stok"
      />
      <Label for="summary">Summary</Label>
      <Textarea
        id="summary"
        name="summary"
        placeholder="Summary"
        v-model="updateBookInputs.summary"
      />
      <Label for="category">Category</Label>
      <Popover v-model:open="open">
        <PopoverTrigger as-child>
          <Button variant="outline" role="combobox" :aria-expanded="open" class="w-full">
            {{
              updateBookInputs.category_id
                ? categories.find((category) => category.id === updateBookInputs.category_id)?.name
                : 'Select category...'
            }}
            <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent class="w-[200px] p-0">
          <Command>
            <CommandInput class="h-9" placeholder="Search category..." />
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandList>
              <CommandGroup>
                <CommandItem
                  v-for="category in categories"
                  :key="category.id"
                  :value="category.id"
                  @select="
                    (ev) => {
                      updateBookInputs.category_id = ev.detail.value
                      open = false
                    }
                  "
                >
                  {{ category.name }}
                  <Check
                    :class="
                      cn(
                        'ml-auto h-4 w-4',
                        updateBookInputs.category_id === category.id ? 'opacity-100' : 'opacity-0'
                      )
                    "
                  />
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Label for="image">Image</Label>
      <img
        :src="updateBookInputs.image"
        :alt="updateBookInputs.title"
        class="w-20 h-20 object-contain"
      />
      <Input
        type="file"
        id="image"
        name="image"
        placeholder="Image"
        @change="(e) => (updateBookInputs.image = e.target.files[0])"
      />
      <Button type="submit" class="mt-4">Save</Button>
    </form>
  </main>
</template>

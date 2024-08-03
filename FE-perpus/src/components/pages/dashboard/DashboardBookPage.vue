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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { PencilLine, Trash2, Check, ChevronsUpDown } from 'lucide-vue-next'
import { useToggleSheetStore } from '@/stores/useToggleSheetStore'
import { useCategoryStore } from '@/stores/useCategoryStore'
import { useLoadingStore } from '@/stores/useLoadingStore'
import { useBookStore } from '@/stores/useBookStore'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { onMounted, ref, reactive } from 'vue'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'
import { cn } from '@/lib/utils'

const openPopover = ref(false)
const { loading } = storeToRefs(useLoadingStore())
const { modalOpen } = storeToRefs(useToggleSheetStore())
const { setIsModalOpen } = useToggleSheetStore()
const bookStore = useBookStore()
const categoryStore = useCategoryStore()
const { books } = storeToRefs(bookStore)
const { createBook, deleteBook, getBooks } = bookStore
const { categories } = storeToRefs(categoryStore)
const { getCategories } = categoryStore

const createBookInputs = reactive({
  title: '',
  stok: '',
  summary: '',
  image: '',
  category_id: ''
})

onMounted(async () => {
  await getBooks()
  await getCategories()
})

const handleCreateBook = async () => await createBook(createBookInputs)
</script>

<template>
  <main class="max-w-5xl mx-auto">
    <div>
      <Dialog :open="modalOpen">
        <DialogTrigger class="py-5">
          <Button @click="setIsModalOpen(true)">Create Book</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create new Book</DialogTitle>
            <DialogDescription>Fill the form below to create a new book.</DialogDescription>
          </DialogHeader>
          <form class="flex flex-col gap-4" @submit.prevent="handleCreateBook">
            <Label for="title">Title</Label>
            <Input
              type="text"
              id="title"
              name="title"
              placeholder="Title"
              v-model="createBookInputs.title"
            />
            <Label for="stok">Stok</Label>
            <Input
              type="number"
              id="stok"
              name="stok"
              placeholder="stok"
              v-model="createBookInputs.stok"
            />
            <Label for="summary">Summary</Label>
            <Textarea
              id="summary"
              name="summary"
              placeholder="Summary"
              v-model="createBookInputs.summary"
            />
            <Label for="category">Category</Label>
            <Popover v-model:open="openPopover">
              <PopoverTrigger as-child>
                <Button
                  variant="outline"
                  role="combobox"
                  :aria-expanded="openPopover"
                  class="w-full"
                >
                  {{
                    createBookInputs.category_id
                      ? categories.find((category) => category.id === createBookInputs.category_id)
                          ?.name
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
                            createBookInputs.category_id = ev.detail.value
                            open = false
                          }
                        "
                      >
                        {{ category.name }}
                        <Check
                          :class="
                            cn(
                              'ml-auto h-4 w-4',
                              createBookInputs.category_id === category.id
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
            <Label for="image">Image</Label>
            <Input
              type="file"
              id="image"
              name="image"
              placeholder="Image"
              @change="(e) => (createBookInputs.image = e.target.files[0])"
            />
            <DialogFooter>
              <Button type="submit" class="mt-4" :disabled="loading">Create</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <Table>
        <TableCaption v-if="books.length < 1 && !loading">
          You have not created any books yet.
        </TableCaption>
        <TableCaption v-else-if="loading">Loading...</TableCaption>
        <TableCaption v-else>A list of your recent books.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead class="w-[15rem]">Summary</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Stok</TableHead>
            <TableHead class="text-end">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="book in books" :key="book.id">
            <TableCell>{{ book.title }}</TableCell>
            <TableCell>{{ book.summary }}</TableCell>
            <TableCell>
              <img
                :src="book.image"
                :alt="book.title"
                loading="lazy"
                class="w-20 h-20 object-contain"
              />
            </TableCell>
            <TableCell>{{ book?.category.name }}</TableCell>
            <TableCell>{{ book.stok }}</TableCell>
            <TableCell class="flex items-center gap-2 justify-end">
              <RouterLink
                :to="{
                  name: 'Dashboard Book Edit',
                  params: { id: book.id }
                }"
              >
                <Button size="icon" variant="secondary" :disabled="loading">
                  <PencilLine />
                </Button>
              </RouterLink>
              <Button
                size="icon"
                :disabled="loading"
                variant="destructive"
                @click="() => deleteBook(book.id)"
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

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
import { Calendar as CalendarIcon } from 'lucide-vue-next'
import { getLocalTimeZone } from '@internationalized/date'
import { useBorrowStore } from '@/stores/useBorrowStore'
import { Check, ChevronsUpDown } from 'lucide-vue-next'
import Button from '@/components/ui/button/Button.vue'
import { useBookStore } from '@/stores/useBookStore'
import Label from '@/components/ui/label/Label.vue'
import { Calendar } from '@/components/ui/calendar'
import { reactive, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { cn, df } from '@/lib/utils'
import { storeToRefs } from 'pinia'

const route = useRoute()
const open = ref(false)
const bookStore = useBookStore()
const { books } = storeToRefs(bookStore)
const { getBooks } = bookStore
const { createBorrow } = useBorrowStore()

const createBorrowInputs = reactive({
  borrow_date: '',
  load_date: '',
  book_id: route.query.id ?? ''
})

onMounted(async () => {
  await getBooks()
})

const handleCreateBorrow = async () => await createBorrow(createBorrowInputs)
</script>
<template>
  <main class="max-w-xl mx-auto">
    <h1 class="text-center py-5 text-2xl font-medium">Borrow a book</h1>
    <form class="flex flex-col gap-4" @submit.prevent="handleCreateBorrow">
      <Label for="title">Borrow Date</Label>
      <Popover>
        <PopoverTrigger as-child>
          <Button
            variant="outline"
            :class="
              cn(
                'w-full justify-start text-left font-normal',
                !createBorrowInputs.borrow_date && 'text-muted-foreground'
              )
            "
          >
            <CalendarIcon class="mr-2 h-4 w-4" />
            {{
              createBorrowInputs.borrow_date
                ? df.format(createBorrowInputs.borrow_date.toDate(getLocalTimeZone()))
                : 'Pick a date'
            }}
          </Button>
        </PopoverTrigger>
        <PopoverContent class="w-auto p-0">
          <Calendar v-model="createBorrowInputs.borrow_date" initial-focus />
        </PopoverContent>
      </Popover>

      <Label for="stok">Load Date</Label>

      <Popover>
        <PopoverTrigger as-child>
          <Button
            variant="outline"
            :class="
              cn(
                'w-full justify-start text-left font-normal',
                !createBorrowInputs.load_date && 'text-muted-foreground'
              )
            "
          >
            <CalendarIcon class="mr-2 h-4 w-4" />
            {{
              createBorrowInputs.load_date
                ? df.format(createBorrowInputs.load_date.toDate(getLocalTimeZone()))
                : 'Pick a date'
            }}
          </Button>
        </PopoverTrigger>
        <PopoverContent class="w-auto p-0">
          <Calendar v-model="createBorrowInputs.load_date" initial-focus />
        </PopoverContent>
      </Popover>
      <Label for="book_id">Book</Label>
      <Popover v-model:open="open">
        <PopoverTrigger as-child>
          <Button variant="outline" role="combobox" :aria-expanded="open" class="w-full">
            {{
              createBorrowInputs.book_id
                ? books.find((book) => book.id === createBorrowInputs.book_id)?.title
                : 'Select book...'
            }}
            <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent class="w-[200px] p-0">
          <Command>
            <CommandInput class="h-9" placeholder="Search book..." />
            <CommandEmpty>No book found.</CommandEmpty>
            <CommandList>
              <CommandGroup>
                <CommandItem
                  v-for="book in books"
                  :key="book.id"
                  :value="book.id"
                  @select="
                    (ev) => {
                      createBorrowInputs.book_id = ev.detail.value
                      open = false
                    }
                  "
                >
                  {{ book.title }}
                  <Check
                    :class="
                      cn(
                        'ml-auto h-4 w-4',
                        createBorrowInputs.book_id === book.id ? 'opacity-100' : 'opacity-0'
                      )
                    "
                  />
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <Button type="submit" class="mt-4">Borrow</Button>
    </form>
  </main>
</template>

<script setup>
import BookDetailSkeleton from '@/components/ui/book/BookDetailSkeleton.vue'
import { useLoadingStore } from '@/stores/useLoadingStore'
import CardBook from '@/components/ui/book/CardBook.vue'
import { useBookStore } from '@/stores/useBookStore'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { df } from '@/lib/utils'
import { onMounted } from 'vue'

const { loading } = storeToRefs(useLoadingStore())
const route = useRoute()
const { id } = route.params
const bookStore = useBookStore()
const { book } = storeToRefs(bookStore)
const { getBook } = bookStore

onMounted(async () => {
  await getBook(id)
})
</script>
<template>
  <main class="max-w-3xl mx-auto">
    <BookDetailSkeleton v-if="loading" />
    <template v-else>
      <CardBook :book="book" />
      <div class="py-6">
        <h1 class="font-medium">List Borrows</h1>

        <ul class="list-disc flex flex-col gap-3 p-4" v-if="book?.list_borrows?.length > 0">
          <li v-for="borrow in book.list_borrows" :key="borrow.id">
            <div class="p-3 shadow border rounded-md flex flex-col gap-2 w-fit">
              <span class="text-sm">
                Borrow Date : {{ df.format(new Date(borrow.borrow_date)) }}</span
              >
              <span class="text-sm"> Load Date : {{ df.format(new Date(borrow.load_date)) }}</span>
            </div>
          </li>
        </ul>
        <div class="pt-4" v-else>
          <p>No borrows found for this book</p>
        </div>
      </div>
    </template>
  </main>
</template>

<script setup>
import BookSkeleton from '@/components/ui/book/BookSkeleton.vue'
import { useLoadingStore } from '@/stores/useLoadingStore'
import CardBook from '@/components/ui/book/CardBook.vue'
import { useBookStore } from '@/stores/useBookStore'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const bookStore = useBookStore()
const { loading } = storeToRefs(useLoadingStore())
const { books } = storeToRefs(bookStore)
const { getBooks } = bookStore

onMounted(async () => {
  await getBooks()
})
</script>

<template>
  <main class="max-w-5xl mx-auto">
    <div class="grid sm:grid-cols-2 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 py-10">
      <BookSkeleton v-if="loading" />
      <template v-else v-for="book in books" :key="book.id">
        <CardBook :book="book" />
      </template>
    </div>
  </main>
</template>

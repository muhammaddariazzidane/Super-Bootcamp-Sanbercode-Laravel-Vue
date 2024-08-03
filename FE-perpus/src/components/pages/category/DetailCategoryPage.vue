<script setup>
import BookSkeleton from '@/components/ui/book/BookSkeleton.vue'
import { useCategoryStore } from '@/stores/useCategoryStore'
import { useLoadingStore } from '@/stores/useLoadingStore'
import CardBook from '@/components/ui/book/CardBook.vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const route = useRoute()
const { id } = route.params
const { loading } = storeToRefs(useLoadingStore())
const categoryStore = useCategoryStore()
const { getCategory } = categoryStore
const { category } = storeToRefs(categoryStore)

onMounted(async () => {
  await getCategory(id)
})
</script>
<template>
  <main class="max-w-5xl mx-auto">
    <h1 class="py-5 text-center text-2xl font-semibold">{{ category.name }}</h1>
    <h1 class="text-center py-10 text-primary/60" v-if="category?.list_books?.length === 0">
      No books found in this category
    </h1>
    <div class="grid sm:grid-cols-2 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 py-10">
      <BookSkeleton v-if="loading" />
      <template v-else v-for="book in category.list_books" :key="book?.id">
        <CardBook :book="book" />
      </template>
    </div>
  </main>
</template>

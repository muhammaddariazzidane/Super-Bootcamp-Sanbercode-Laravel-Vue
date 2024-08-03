<script setup>
import { Card, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import CategorySkeleton from '@/components/ui/category/CategorySkeleton.vue'
import { useCategoryStore } from '@/stores/useCategoryStore'
import { useLoadingStore } from '@/stores/useLoadingStore'
import { Button } from '@/components/ui/button'
import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const { loading } = storeToRefs(useLoadingStore())
const categoryStore = useCategoryStore()
const { categories } = storeToRefs(categoryStore)
const { getCategories } = categoryStore

onMounted(async () => {
  await getCategories()
})
</script>

<template>
  <main class="max-w-5xl mx-auto">
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 py-10">
      <CategorySkeleton v-if="loading" />
      <Card v-else v-for="category in categories" :key="category.id">
        <CardHeader>
          <CardTitle>{{ category.name }}</CardTitle>
        </CardHeader>
        <CardFooter>
          <RouterLink :to="{ name: 'Category Detail', params: { id: category?.id } }">
            <Button class="p-0" variant="link">See More...</Button>
          </RouterLink>
        </CardFooter>
      </Card>
    </div>
  </main>
</template>

<script setup>
import { useCategoryStore } from '@/stores/useCategoryStore'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useRoute } from 'vue-router'
import { ref } from 'vue'

const route = useRoute()
const { updateCategory } = useCategoryStore()
const { id } = route.params

const name = ref(route.query.name)

const handleUpdateCategory = async () => await updateCategory(name, id)
</script>

<template>
  <main class="max-w-md mx-auto">
    <h1 class="text-2xl text-center font-medium py-4">Edit Category</h1>
    <form class="flex flex-col gap-4" @submit.prevent="handleUpdateCategory">
      <Label for="name">Name</Label>
      <Input type="text" id="name" name="name" placeholder="Category name" v-model="name" />
      <Button type="submit" class="mt-4">Save</Button>
    </form>
  </main>
</template>

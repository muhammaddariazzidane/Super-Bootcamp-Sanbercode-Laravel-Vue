<script setup>
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { RouterLink, useRoute } from 'vue-router'
import { defineProps } from 'vue'

const route = useRoute()
defineProps({
  book: {
    type: Object,
    required: true
  }
})
const pathDetail = route.path.split('/').length == 3
const notCategoryPath = !route.path.startsWith('/category')
</script>
<template>
  <Card>
    <CardHeader>
      <CardTitle>{{ book.title }}</CardTitle>
    </CardHeader>
    <CardContent>
      <img :src="book.image" loading="lazy" :alt="book.image" class="pb-3" />
      <CardDescription>{{ book.summary }}</CardDescription>
      <RouterLink
        v-if="notCategoryPath"
        :to="{ name: 'Category Detail', params: { id: book?.category?.id } }"
      >
        <Badge v-if="notCategoryPath" class="mt-3">{{ book?.category?.name }}</Badge>
      </RouterLink>
    </CardContent>
    <CardFooter :class="pathDetail && notCategoryPath && 'flex justify-end'">
      <RouterLink
        v-if="pathDetail && notCategoryPath"
        :to="{ name: 'Borrow', query: { id: book.id } }"
      >
        <Button variant="default">Borrow +</Button>
      </RouterLink>
      <RouterLink v-else :to="{ name: 'Book Detail', params: { id: book?.id } }">
        <Button class="p-0" variant="link">See More...</Button>
      </RouterLink>
    </CardFooter>
  </Card>
</template>

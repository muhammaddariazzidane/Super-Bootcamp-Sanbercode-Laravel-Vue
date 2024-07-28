<script setup>
import { Card, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { Button } from '@/components/ui/button'
import { useCastStore } from '@/stores/useCastStore'

const { getCasts, casts, isLoading } = useCastStore()

onMounted(async () => {
  await getCasts()
})
</script>

<template>
  <main class="max-w-5xl mx-auto">
    <h1 class="py-4 font-semibold text-xl">List Casts</h1>
    <h1 v-if="isLoading">loading....</h1>
    <h1 class="py-6 text-center" v-if="casts.length < 1">No data available</h1>
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <Card v-for="cast in casts" :key="cast.id" class="cursor-pointer">
        <CardHeader class="flex gap-2 items-center">
          <CardTitle>{{ cast.name }}</CardTitle>
          <Avatar>
            <AvatarImage :src="`https://api.multiavatar.com/${cast.name}.png`" alt="@radix-vue" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <CardDescription>{{ cast.role }}</CardDescription>
          <CardFooter>
            <RouterLink :to="{ name: 'Cast Detail', params: { id: cast.id } }">
              <Button size="sm" variant="secondary">Detail</Button>
            </RouterLink>
          </CardFooter>
        </CardHeader>
      </Card>
    </div>
  </main>
</template>

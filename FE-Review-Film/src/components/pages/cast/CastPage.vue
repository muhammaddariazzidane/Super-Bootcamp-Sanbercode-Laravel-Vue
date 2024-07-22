<script setup>
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const casts = [
  {
    id: 1,
    name: 'John Smith',
    role: 'Actor'
  },
  {
    id: 2,
    name: 'Jane Smith',
    role: 'Actress'
  },
  {
    id: 3,
    name: 'Robert Brown',
    role: 'Actor'
  },
  {
    id: 4,
    name: 'Emily Davis',
    role: 'Actress'
  },
  {
    id: 5,
    name: 'Michael Johnson',
    role: 'Actor'
  },
  {
    id: 6,
    name: 'Sarah Wilson',
    role: 'Actress'
  },
  {
    id: 7,
    name: 'David Martinez',
    role: 'Actor'
  },
  {
    id: 8,
    name: 'Laura Garcia',
    role: 'Actress'
  },
  {
    id: 9,
    name: 'James Lee',
    role: 'Actor'
  },
  {
    id: 10,
    name: 'Anna Kim',
    role: 'Actress'
  }
]
</script>

<template>
  <main class="max-w-5xl mx-auto">
    <h1 class="py-4 font-semibold text-xl">List Casts</h1>
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <Card v-for="(cast, index) in casts" :key="index" class="cursor-pointer">
        <CardHeader class="flex gap-2 items-center">
          <CardTitle>{{ cast.name }}</CardTitle>
          <Avatar>
            <AvatarImage :src="`https://api.multiavatar.com/${cast.name}.png`" alt="@radix-vue" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <CardDescription>{{ cast.role }}</CardDescription>
        </CardHeader>
      </Card>
    </div>
  </main>
</template>

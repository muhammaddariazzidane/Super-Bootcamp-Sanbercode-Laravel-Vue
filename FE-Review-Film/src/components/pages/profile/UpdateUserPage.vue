<script setup>
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuthStore } from '@/stores/useAuthStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ref } from 'vue'
const authStore = useAuthStore()
const name = ref(authStore.user.name)

const handleUpdateUser = () => authStore.updateUser(name.value)
</script>

<template>
  <main class="max-w-5xl mx-auto px-4 py-10">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Your User Data</CardTitle>
          <CardDescription> your information </CardDescription>
        </CardHeader>
        <CardContent>
          <div class="flex gap-3">
            <Avatar>
              <AvatarImage
                class="w-24 h-24 rounded-full"
                :src="authStore.user.name"
                :alt="authStore.user.name"
              />
              <AvatarFallback>{{ authStore.user.name.substr(0, 2) }}</AvatarFallback>
            </Avatar>
            <div>
              <h1 class="font-medium text-sm">Name: {{ authStore.user.name }}</h1>
              <h2 class="font-medium text-sm">Email: {{ authStore.user.email }}</h2>
              <h3 class="font-medium text-sm">Verified: {{ authStore.user.email_verified_at }}</h3>
            </div>
          </div>
        </CardContent>
      </Card>
      <form class="w-full col-span-2" @submit.prevent="handleUpdateUser">
        <Card>
          <CardHeader>
            <CardTitle>Update User</CardTitle>
            <CardDescription> Update your user information </CardDescription>
          </CardHeader>
          <CardContent>
            <div class="grid items-center w-full gap-4">
              <div class="flex flex-col space-y-1.5">
                <Label for="name">Name</Label>
                <Input type="text" v-model="name" id="name" placeholder="Your new name" />
              </div>
            </div>
          </CardContent>
          <CardFooter class="flex justify-between px-6 pb-6">
            <Button type="submit">Save</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  </main>
</template>

<script setup>
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/stores/useAuthStore'
import { ref } from 'vue'

const authStore = useAuthStore()
const name = ref(authStore.user.name)

const handleUpdateProfile = () => authStore.updateProfile(name.value)
</script>

<template>
  <main class="max-w-5xl mx-auto px-4 py-10">
    <form @submit.prevent="handleUpdateProfile">
      <Card class="max-w-sm mx-auto">
        <CardHeader>
          <CardTitle>Update Profile</CardTitle>
          <CardDescription> Update your profile information </CardDescription>
        </CardHeader>
        <CardContent>
          <div class="grid items-center w-full gap-4">
            <div class="flex flex-col space-y-1.5">
              <Label for="name">Name</Label>
              <Input v-model="name" id="name" placeholder="Your new name" />
            </div>
          </div>
        </CardContent>
        <CardFooter class="flex justify-between px-6 pb-6">
          <Button type="submit">Save</Button>
        </CardFooter>
      </Card>
    </form>
  </main>
</template>

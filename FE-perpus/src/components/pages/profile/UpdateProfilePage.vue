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
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { reactive } from 'vue'

const { user, updateOrCreateProfile } = useAuthStore()
const updateOrCreateProfileInputs = reactive({
  age: '',
  bio: ''
})

const handleUpdateOrCreateProfile = () => {
  updateOrCreateProfile(updateOrCreateProfileInputs)
}
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
              <AvatarImage class="w-24 h-24 rounded-full" :src="user.name" :alt="user.name" />
              <AvatarFallback>{{ user.name.substr(0, 2) }}</AvatarFallback>
            </Avatar>
            <div>
              <h1 class="font-medium text-sm">Name: {{ user.name }}</h1>
              <h2 class="font-medium text-sm">Email: {{ user.email }}</h2>
            </div>
          </div>
        </CardContent>
      </Card>
      <form class="w-full col-span-2" @submit.prevent="handleUpdateOrCreateProfile">
        <Card>
          <CardHeader>
            <CardTitle>Update Profile</CardTitle>
            <CardDescription> Update your profile information </CardDescription>
          </CardHeader>
          <CardContent>
            <div class="grid items-center w-full gap-4">
              <div class="flex flex-col space-y-1.5">
                <Label for="age">Age</Label>
                <Input
                  type="text"
                  v-model="updateOrCreateProfileInputs.age"
                  id="age"
                  placeholder="Your age"
                />
                <Label for="bio">Bio</Label>
                <Textarea
                  v-model="updateOrCreateProfileInputs.bio"
                  id="bio"
                  placeholder="Your bio"
                />
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

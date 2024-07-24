<script setup>
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { reactive } from 'vue'
import { useAuthStore } from '@/stores/useAuthStore'
import Textarea from '@/components/ui/textarea/Textarea.vue'
const authStore = useAuthStore()

const userIputs = reactive({
  age: '',
  biodata: '',
  address: ''
})

const handleUpdateProfile = () => {
  authStore.updateOrCreateProfile(userIputs)
}
</script>

<template>
  <main class="max-w-xl mx-auto px-4 py-10">
    <form class="w-full col-span-2" @submit.prevent="handleUpdateProfile">
      <Card>
        <CardHeader>
          <CardTitle>Update or Create Profile</CardTitle>
          <CardDescription> Update or Create your profile information </CardDescription>
        </CardHeader>
        <CardContent>
          <div class="grid items-center w-full gap-4">
            <div class="flex flex-col space-y-1.5">
              <Label for="age">Age</Label>
              <Input type="number" v-model="userIputs.age" id="age" placeholder="Your age" />
              <Label for="biodata">Biodata</Label>
              <Input
                type="text"
                v-model="userIputs.biodata"
                id="biodata"
                placeholder="Your biodata"
              />
              <Label for="address">Address</Label>
              <Textarea v-model="userIputs.address" id="address" placeholder="Your address" />
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

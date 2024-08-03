<script setup>
import { useAuthStore } from '@/stores/useAuthStore'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { RouterLink } from 'vue-router'
import { reactive } from 'vue'

const userInputs = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
})

const authStore = useAuthStore()

const handleRegister = () => authStore.register(userInputs)
</script>

<template>
  <main class="max-w-lg mx-auto min-h-screen flex flex-col items-center justify-center p-4">
    <form @submit.prevent="handleRegister" class="w-full p-4 rounded-md shadow flex flex-col gap-4">
      <h1 class="font-bold text-xl pb-2 text-center">Register to Library</h1>
      <Label for="name">Name</Label>
      <Input v-model="userInputs.name" type="text" id="name" name="name" placeholder="Your name" />
      <Label for="email">Email</Label>
      <Input
        v-model="userInputs.email"
        type="email"
        id="email"
        name="email"
        placeholder="Your email"
      />
      <Label for="password">Password</Label>
      <Input
        v-model="userInputs.password"
        type="password"
        id="password"
        name="password"
        placeholder="Your password"
      />
      <Label for="password_confirmation">Password Confirmation</Label>
      <Input
        v-model="userInputs.password_confirmation"
        type="password"
        id="password_confirmation"
        name="password_confirmation"
        placeholder="Your password confirmation"
      />
      <RouterLink to="/login">
        <p class="text-sm hover:underline hover:text-primary">
          Allready have an account? <span class="underline">Login</span>
        </p>
      </RouterLink>
      <Button type="submit">Register</Button>
    </form>
  </main>
</template>

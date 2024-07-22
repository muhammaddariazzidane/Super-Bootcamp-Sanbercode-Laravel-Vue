<script setup>
import { RouterLink } from 'vue-router'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
</script>

<template>
  <main class="max-w-lg mx-auto min-h-screen flex flex-col items-center justify-center p-4">
    <form class="w-full p-4 rounded-md shadow flex flex-col gap-4">
      <h1 class="font-bold text-xl pb-2 text-center">Login to Review Film</h1>
      <Label for="email">Email</Label>
      <Input type="email" id="email" name="email" placeholder="Your email" />
      <Label for="password">Password</Label>
      <Input type="password" id="password" name="password" placeholder="Your password" />
      <RouterLink to="/register">
        <p class="text-sm hover:underline hover:text-primary">
          Don't have an account? <span class="underline">Register</span>
        </p>
      </RouterLink>
      <Button type="submit">Login</Button>
    </form>
  </main>
</template>

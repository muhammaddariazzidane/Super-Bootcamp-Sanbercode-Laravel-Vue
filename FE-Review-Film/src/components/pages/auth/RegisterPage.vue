<script setup>
import { RouterLink } from 'vue-router'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
</script>

<template>
  <main class="max-w-lg mx-auto min-h-screen flex flex-col items-center justify-center p-4">
    <form class="w-full p-4 rounded-md shadow flex flex-col gap-4">
      <h1 class="font-bold text-xl pb-2 text-center">Register to Review Film</h1>
      <Label for="name">Name</Label>
      <Input type="text" id="name" name="name" placeholder="Your name" />
      <Label for="email">Email</Label>
      <Input type="email" id="email" name="email" placeholder="Your email" />
      <Label for="password">Password</Label>
      <Input type="password" id="password" name="password" placeholder="Your password" />
      <RouterLink to="/login">
        <p class="text-sm hover:underline hover:text-primary">
          Allready have an account? <span class="underline">Login</span>
        </p>
      </RouterLink>
      <Button type="submit">Register</Button>
    </form>
  </main>
</template>

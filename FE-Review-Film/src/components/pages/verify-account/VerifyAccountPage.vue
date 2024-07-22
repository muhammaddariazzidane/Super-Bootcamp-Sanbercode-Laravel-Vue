<script setup>
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
</script>

<template>
  <main class="py-10 max-w-lg mx-auto">
    <h1 class="text-xl text-center font-semibold">Verify Your Account</h1>
    <p class="text-center text-gray-600 dark:text-gray-400 mt-4">
      We have sent an email to your email address. Please verify your account.
    </p>
    <form class="max-w-sm mx-auto flex items-center justify-center mt-6 gap-3">
      <Input type="number" class="w-full" placeholder="Your OTP Code" />
      <Button type="submit">Verify</Button>
    </form>
  </main>
</template>

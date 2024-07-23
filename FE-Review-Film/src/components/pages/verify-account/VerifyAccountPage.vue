<script setup>
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/stores/useAuthStore'
import { ref } from 'vue'

const authStore = useAuthStore()
const otp = ref('')

const handleVerifyOtpCode = () => {
  authStore.verifyOtpCode(otp.value)
}
</script>

<template>
  <main class="py-10 max-w-lg mx-auto">
    <h1 class="text-xl text-center font-semibold">Verify Your Account</h1>
    <p class="text-center text-gray-600 dark:text-gray-400 mt-4">
      We have sent an email to your email address. Please verify your account.
    </p>
    <form
      @submit.prevent="handleVerifyOtpCode"
      class="max-w-sm mx-auto flex items-center justify-center mt-6 gap-3"
    >
      <Input v-model="otp" type="number" class="w-full" placeholder="Your OTP Code here" required />
      <Button type="submit">Verify</Button>
    </form>
    <div>
      <p class="text-center text-gray-600 dark:text-gray-400 mt-4">
        Didn't receive the email?
        <button
          type="button"
          @click="() => authStore.generateOtpCode(authStore.user.email)"
          class="text-primary"
        >
          Generate OTP Code
        </button>
      </p>
    </div>
  </main>
</template>

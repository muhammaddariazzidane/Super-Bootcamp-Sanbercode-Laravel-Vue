<script setup>
import { RouterLink } from 'vue-router'
import Sidebar from '@/components/ui/navigation/Sidebar.vue'
import NavbarLink from '@/components/ui/navigation/NavbarLink.vue'
import DarkModeToggle from '@/components/ui/dark-mode/dark-mode-toggle.vue'
import { Icon } from '@iconify/vue'
import { Button } from '@/components/ui/button'
</script>

<template>
  <header class="w-full sticky top-0 z-50 left-0 right-0 py-4 px-3 bg-primary text-white shadow">
    <nav class="flex justify-between gap-4 items-center flex-wrap">
      <RouterLink to="/" class="flex items-center gap-x-2">
        <Icon icon="streamline-emojis:nerd-face" class="h-6 w-6" />

        <h1 class="text-lg font-bold">Review Film</h1>
      </RouterLink>
      <div class="sm:flex hidden items-center gap-6">
        <NavbarLink />
      </div>
      <div class="flex gap-3">
        <DarkModeToggle />
        <Button variant="destructive" class="sm:block hidden"> Logout </Button>
        <Sidebar />
      </div>
    </nav>
  </header>
</template>

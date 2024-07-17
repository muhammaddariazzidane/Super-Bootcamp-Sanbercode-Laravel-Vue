<script setup>
import { RouterLink } from 'vue-router'
import Sidebar from '@/components/ui/navigation/Sidebar.vue'
import NavbarLink from '@/components/ui/navigation/NavbarLink.vue'
</script>

<template>
  <header class="w-full sticky top-0 z-50 left-0 right-0 py-4 px-3 bg-white shadow">
    <nav class="flex justify-between gap-4 items-center">
      <RouterLink to="/">
        <h1 class="text-lg font-semibold">Muhammad Dariaz Zidane</h1>
      </RouterLink>
      <div class="sm:flex hidden items-center gap-6">
        <NavbarLink />
      </div>
      <Sidebar />
    </nav>
  </header>
</template>

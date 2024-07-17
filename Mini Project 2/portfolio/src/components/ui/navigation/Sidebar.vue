<script setup>
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { useToggleSheetStore } from '@/stores/useToggleSheetStore'
import NavbarLink from '@/components/ui/navigation/NavbarLink.vue'
import { storeToRefs } from 'pinia'

const store = useToggleSheetStore()
const { open } = storeToRefs(store)
const { setIsOpen } = store
</script>

<template>
  <Sheet :open="open" @update:open="setIsOpen">
    <SheetTrigger class="sm:hidden" @click="() => setIsOpen(true)">
      <svg fill="hsl(var(--primary))" viewBox="0 0 100 80" width="40" height="15">
        <rect width="100" height="20"></rect>
        <rect y="30" width="100" height="20"></rect>
        <rect y="60" width="100" height="20"></rect>
      </svg>
    </SheetTrigger>
    <SheetContent>
      <SheetHeader>
        <SheetTitle class="text-start ps-3">Muhammad Dariaz Zidane</SheetTitle>
        <SheetDescription class="flex flex-col items-start py-4 gap-2">
          <NavbarLink />
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  </Sheet>
</template>

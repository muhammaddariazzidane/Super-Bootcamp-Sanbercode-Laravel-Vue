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
import { Icon } from '@iconify/vue'
import { Button } from '@/components/ui/button'

const store = useToggleSheetStore()
const { open } = storeToRefs(store)
const { setIsOpen } = store
</script>

<template>
  <Sheet :open="open" @update:open="setIsOpen">
    <SheetTrigger class="sm:hidden" @click="() => setIsOpen(true)">
      <Icon icon="radix-icons:drag-handle-horizontal" class="h-6 w-6" />
    </SheetTrigger>
    <SheetContent class="flex flex-col sm:hidden bg-primary text-white">
      <SheetHeader>
        <SheetTitle class="text-start ps-3 text-white">Review Film</SheetTitle>
        <SheetDescription class="flex flex-col items-start py-4 gap-2 text-white">
          <NavbarLink />
        </SheetDescription>
      </SheetHeader>
      <div class="mt-auto px-3">
        <Button variant="destructive"> Logout </Button>
      </div>
    </SheetContent>
  </Sheet>
</template>

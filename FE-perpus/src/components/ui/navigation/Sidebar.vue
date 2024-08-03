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
import ButtonLogout from '@/components/ui/navigation/ButtonLogout.vue'
import { useRoute } from 'vue-router'

const store = useToggleSheetStore()
const { open } = storeToRefs(store)
const { setIsOpen } = store
const route = useRoute()
const dashboardPath = route.path.startsWith('/dashboard')

</script>

<template>
  <Sheet :open="open" @update:open="setIsOpen">
    <SheetTrigger class="sm:hidden" @click="() => setIsOpen(true)">
      <Icon icon="radix-icons:drag-handle-horizontal" class="h-6 w-6" />
    </SheetTrigger>
    <SheetContent
      :class="dashboardPath ? 'bg-secondary' : 'bg-primary'"
      class="flex flex-col sm:hidden text-white"
    >
      <SheetHeader>
        <SheetTitle
          class="text-start ps-3 text-white"
          :class="dashboardPath && 'dark:text-white text-black'"
          >E-Library</SheetTitle
        >
        <SheetDescription
          class="flex flex-col items-start py-4 gap-2 text-white"
          :class="dashboardPath && 'dark:text-white text-black'"
        >
          <NavbarLink />
        </SheetDescription>
      </SheetHeader>
      <div class="mt-auto px-3">
        <ButtonLogout />
      </div>
    </SheetContent>
  </Sheet>
</template>

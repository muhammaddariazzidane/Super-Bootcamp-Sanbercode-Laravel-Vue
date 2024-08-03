<script setup>
import { Skeleton } from '@/components/ui/skeleton'
</script>
<template>
  <div class="flex gap-4 justify-center">
    <div class="flex flex-col space-y-3 w-full pt-12">
      <Skeleton class="h-5 w-[100px]" />
      <Skeleton class="h-[125px] w-full rounded-xl" />
      <div class="space-y-8">
        <Skeleton class="h-14 w-[90%]" />
        <Skeleton class="h-6 w-[60px]" />
        <Skeleton class="h-5 w-[90px]" />
      </div>
    </div>
  </div>
</template>

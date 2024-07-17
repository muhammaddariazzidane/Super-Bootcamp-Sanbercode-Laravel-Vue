<script setup>
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

defineProps({
  item: {
    type: Object,
    required: true
  }
})
</script>
<template>
  <Dialog>
    <DialogTrigger>
      <div class="max-w-36 shadow h-fit rounded-md px-0 py-2 md:max-w-48 max-h-52">
        <img
          class="w-full max-h-48 object-contain"
          :src="item.value"
          :alt="item.value"
          loading="lazy"
        />
      </div>
    </DialogTrigger>
    <DialogContent>
      <img class="w-full h-full" :src="item.value" :alt="item.value" loading="lazy" />
    </DialogContent>
  </Dialog>
</template>

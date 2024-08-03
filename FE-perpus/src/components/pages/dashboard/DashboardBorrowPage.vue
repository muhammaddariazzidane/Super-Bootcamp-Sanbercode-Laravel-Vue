<script setup>
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { useLoadingStore } from '@/stores/useLoadingStore'
import { useBorrowStore } from '@/stores/useBorrowStore'
import { storeToRefs } from 'pinia'
import { df } from '@/lib/utils'
import { onMounted } from 'vue'

const { loading } = storeToRefs(useLoadingStore())
const borrowStore = useBorrowStore()
const { getBorrows } = borrowStore
const { borrows } = storeToRefs(borrowStore)

onMounted(async () => {
  await getBorrows()
})
</script>

<template>
  <main class="max-w-5xl mx-auto">
    <div>
      <Table>
        <TableCaption v-if="borrows.length < 1 && !loading">
          You have not created any borrows yet.
        </TableCaption>
        <TableCaption v-else-if="loading">Loading...</TableCaption>
        <TableCaption v-else>A list of your recent borrows.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead class="w-[15rem]">Load Date</TableHead>
            <TableHead class="w-[15rem]">Borrow Date</TableHead>
            <TableHead class="w-[15rem]">Book</TableHead>
            <TableHead class="w-[15rem]">User</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="borrow in borrows" :key="borrow.id">
            <TableCell>{{ df.format(new Date(borrow.load_date)) }}</TableCell>
            <TableCell>{{ df.format(new Date(borrow.borrow_date)) }}</TableCell>
            <TableCell>{{ borrow.book.title }}</TableCell>
            <TableCell>{{ borrow.user.name }}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </main>
</template>

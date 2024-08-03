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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { useToggleSheetStore } from '@/stores/useToggleSheetStore'
import { useLoadingStore } from '@/stores/useLoadingStore'
import { useRoleStore } from '@/stores/useRoleStore'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { PencilLine } from 'lucide-vue-next'
import { Trash2 } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'

const name = ref('')
const { loading } = storeToRefs(useLoadingStore())
const { modalOpen } = storeToRefs(useToggleSheetStore())
const { setIsModalOpen } = useToggleSheetStore()
const roleStore = useRoleStore()
const { roles } = storeToRefs(roleStore)
const { createRole, deleteRole, getRoles } = roleStore

const handleCreateRole = async () => await createRole(name)

onMounted(async () => {
  await getRoles()
})
</script>

<template>
  <main class="max-w-5xl mx-auto">
    <div>
      <Dialog :open="modalOpen">
        <DialogTrigger class="py-5"
          ><Button @click="setIsModalOpen(true)">Create Role</Button></DialogTrigger
        >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create new Role</DialogTitle>
            <DialogDescription>Fill the form below to create a new role.</DialogDescription>
          </DialogHeader>
          <form @submit.prevent="handleCreateRole">
            <Label for="name">Name</Label>
            <Input type="text" id="name" name="name" placeholder="Role name" v-model="name" />
            <DialogFooter>
              <Button type="submit" class="mt-4">Create</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <Table>
        <TableCaption v-if="roles.length < 1 && !loading">
          You have not created any roles yet.
        </TableCaption>
        <TableCaption v-else-if="loading">Loading...</TableCaption>
        <TableCaption v-else>A list of your recent roles.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead class="w-[15rem]">Name</TableHead>
            <TableHead class="text-end">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="role in roles" :key="role.id">
            <TableCell>{{ role.name }}</TableCell>
            <TableCell class="flex items-center gap-2 justify-end">
              <RouterLink
                :to="{
                  name: 'Dashboard Role Edit',
                  params: { id: role.id },
                  query: { name: role.name }
                }"
              >
                <Button size="icon" variant="secondary" :disabled="loading">
                  <PencilLine />
                </Button>
              </RouterLink>
              <Button
                size="icon"
                variant="destructive"
                :disabled="loading"
                @click="() => deleteRole(role.id)"
              >
                <Trash2 />
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </main>
</template>

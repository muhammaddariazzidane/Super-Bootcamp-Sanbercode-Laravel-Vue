<script setup>
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { ref } from 'vue'
import { useRoleStore } from '@/stores/useRoleStore'
import { Button } from '@/components/ui/button'
import { useRoute } from 'vue-router'

const route = useRoute()
const { updateRole } = useRoleStore()

const id = route.params.id

const name = ref(route.query.name)
const handleUpdateRole = async () => await updateRole(id, name.value)

</script>

<template>
  <main class="max-w-4xl mx-auto">
    <h1 class="text-2xl text-center font-medium py-4">Edit Role</h1>
    <form class="flex flex-col gap-4" @submit.prevent="handleUpdateRole">
      <Label for="name">Name</Label>
      <Input
        type="text"
        id="name"
        name="name"
        placeholder="Role name"
        v-model="name"
      />
      <Button type="submit" class="mt-4">Save</Button>
    </form>
  </main>
</template>

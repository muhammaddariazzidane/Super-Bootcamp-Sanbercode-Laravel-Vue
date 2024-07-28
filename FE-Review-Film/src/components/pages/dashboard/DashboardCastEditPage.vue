<script setup>
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { reactive, onMounted } from 'vue'
import { useCastStore } from '@/stores/useCastStore'
import { Button } from '@/components/ui/button'
import { useRoute } from 'vue-router'
import { Textarea } from '@/components/ui/textarea'

const route = useRoute()
const { getDetailCast, cast, updateCast } = useCastStore()

const id = route.params.id

onMounted(async () => {
  if (id) await getDetailCast(id)
})
const updateCastInputs = reactive({
  name: cast.name,
  age: cast.age,
  bio: cast.bio
})

const handleUpdateCast = async () => {
  await updateCast(id, updateCastInputs)
}
</script>

<template>
  <main class="max-w-4xl mx-auto">
    <h1 class="text-2xl text-center font-medium py-4">Edit Cast</h1>
    <form class="flex flex-col gap-4" @submit.prevent="handleUpdateCast">
      <Label for="name">Name</Label>
      <Input
        type="text"
        id="name"
        name="name"
        placeholder="Cast name"
        v-model="updateCastInputs.name"
      />
      <Label for="age">Age</Label>
      <Input
        type="number"
        id="age"
        name="age"
        placeholder="Cast age"
        v-model="updateCastInputs.age"
      />
      <Label for="bio">Bio</Label>
      <Textarea id="bio" name="bio" placeholder="Cast bio" v-model="updateCastInputs.bio" />
      <Button type="submit" class="mt-4">Save</Button>
    </form>
  </main>
</template>

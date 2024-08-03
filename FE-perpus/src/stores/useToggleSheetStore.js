import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useToggleSheetStore = defineStore('useToggleSheetStore', () => {
  const open = ref(false)
  const setIsOpen = (data) => (open.value = data)
  const modalOpen = ref(false)
  const setIsModalOpen = (data) => (modalOpen.value = data)

  return { open, setIsOpen, modalOpen, setIsModalOpen }
})

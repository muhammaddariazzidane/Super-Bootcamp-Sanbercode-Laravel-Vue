import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useToggleSheetStore = defineStore('useToggleSheetStore', () => {
  const open = ref(false)
  const setIsOpen = (data) => (open.value = data)

  return { open, setIsOpen }
})

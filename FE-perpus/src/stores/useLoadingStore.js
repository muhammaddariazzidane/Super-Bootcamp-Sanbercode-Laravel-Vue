import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoadingStore = defineStore('useLoadingStore', () => {
  const loading = ref(false)
  const setLoading = (data) => (loading.value = data)

  return { loading, setLoading }
})

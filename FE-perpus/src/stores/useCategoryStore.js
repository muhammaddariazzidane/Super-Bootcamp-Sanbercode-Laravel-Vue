import { useToggleSheetStore } from '@/stores/useToggleSheetStore'
import { useLoadingStore } from '@/stores/useLoadingStore'
import { useAuthStore } from '@/stores/useAuthStore'
import { defineStore, storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { api } from '@/api'
import { ref } from 'vue'

export const useCategoryStore = defineStore('useCategoryStore', () => {
  const category = ref({})
  const categories = ref([])
  const authStore = useAuthStore()
  const { setIsModalOpen } = useToggleSheetStore()
  const { setLoading } = useLoadingStore()
  const { token } = storeToRefs(authStore)
  const { setMessage } = authStore
  const { back } = useRouter()

  const getCategories = async () => {
    try {
      setLoading(true)
      const response = await api.get('/category')
      if (response.status === 200) categories.value = response.data.data
    } catch (error) {
      setMessage('error', error.response.data.message ?? error.message)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }
  const getCategory = async (id) => {
    try {
      setLoading(true)
      const response = await api.get(`/category/${id}`)
      if (response.status === 200) category.value = response.data.data
    } catch (error) {
      setMessage('error', error.response.data.message ?? error.message)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }
  const createCategory = async (name) => {
    try {
      const response = await api.post(
        '/category',
        { name: name.value },
        {
          headers: {
            Authorization: `Bearer ${token.value}`
          }
        }
      )
      if (response.status === 201) {
        setIsModalOpen(false)
        setMessage('success', response.data.message)
        categories.value.unshift(response.data.data)
      }
    } catch (error) {
      setMessage('error', error.response.data.message ?? error.message)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }
  const updateCategory = async (name, id) => {
    try {
      const response = await api.post(
        `/category/${id}?_method=PUT`,
        { name: name.value },
        {
          headers: {
            Authorization: `Bearer ${token.value}`
          }
        }
      )
      if (response.status === 200) {
        categories.value = categories.value.filter((category) => category.id !== id)
        categories.value.unshift(response.data.data)
        setMessage('success', response.data.message)
        back()
      }
    } catch (error) {
      setLoading(false)
      setMessage('error', 'Failed to update category')
    } finally {
      setLoading(false)
    }
  }
  const deleteCategory = async (id) => {
    try {
      setLoading(true)
      const response = await api.post(`/category/${id}?_method=DELETE`, null, {
        headers: {
          Authorization: `Bearer ${token.value}`
        }
      })
      if (response.status === 200) {
        setMessage('success', response.data.message)
        categories.value = categories.value.filter((category) => category.id !== id)
      }
    } catch (error) {
      setMessage('error', error.response.data.message ?? error.message)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  return {
    categories,
    category,
    createCategory,
    updateCategory,
    deleteCategory,
    getCategories,
    getCategory
  }
})

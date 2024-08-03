import { useToggleSheetStore } from '@/stores/useToggleSheetStore'
import { useLoadingStore } from '@/stores/useLoadingStore'
import { useAuthStore } from '@/stores/useAuthStore'
import { defineStore, storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { api } from '@/api'
import { ref } from 'vue'

export const useBookStore = defineStore('useBookStore', () => {
  const book = ref({})
  const books = ref([])
  const authStore = useAuthStore()
  const { setIsModalOpen } = useToggleSheetStore()
  const { setLoading } = useLoadingStore()
  const { token } = storeToRefs(authStore)
  const { setMessage } = authStore
  const { back } = useRouter()

  const getBooks = async () => {
    try {
      setLoading(true)
      const response = await api.get('/book')
      if (response.status === 200) books.value = response.data.data
    } catch (error) {
      setMessage('error', error.response.data.message ?? error.message)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }
  const createBook = async (createBookInputs) => {
    try {
      setLoading(true)
      const formData = new FormData()
      formData.append('title', createBookInputs.title)
      formData.append('stok', createBookInputs.stok)
      formData.append('summary', createBookInputs.summary)
      formData.append('image', createBookInputs.image)
      formData.append('category_id', createBookInputs.category_id)

      const response = await api.post('/book', formData, {
        headers: {
          Authorization: `Bearer ${token.value}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      if (response.status === 201) {
        const responseBook = await api.get('/book', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setIsModalOpen(false)
        setMessage('success', response.data.message)
        books.value = responseBook.data.data
      }
    } catch (error) {
      setMessage('error', 'Error creating book')
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }
  const updateBook = async (updateBookInputs, id) => {
    try {
      setLoading(true)
      const formData = new FormData()
      formData.append('title', updateBookInputs.title)
      formData.append('stok', updateBookInputs.stok)
      formData.append('summary', updateBookInputs.summary)
      formData.append('category_id', updateBookInputs.category_id)
      formData.append('image', updateBookInputs.image)
      const response = await api.post(`/book/${id}?_method=PUT`, formData, {
        headers: {
          Authorization: `Bearer ${token.value}`
        }
      })
      if (response.status === 200) {
        setMessage('success', response.data.message)
        back()
      }
    } catch (error) {
      setMessage('error', 'error updating book')
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  const deleteBook = async (id) => {
    try {
      setLoading(true)
      const response = await api.post(`/book/${id}?_method=DELETE`, null, {
        headers: {
          Authorization: `Bearer ${token.value}`
        }
      })
      if (response.status === 200) {
        setMessage('success', response.data.message)
        books.value = books.value.filter((book) => book.id !== id)
      }
    } catch (error) {
      setMessage('error', error.response.data.message ?? error.message)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }
  const getBook = async (id) => {
    try {
      setLoading(true)
      const response = await api.get(`/book/${id}`)
      if (response.status === 200) book.value = response.data.data
    } catch (error) {
      setMessage('error', error.response.data.message ?? error.message)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }
  return { books, book, createBook, updateBook, deleteBook, getBooks, getBook }
})

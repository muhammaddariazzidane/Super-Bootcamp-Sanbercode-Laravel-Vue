import { useLoadingStore } from '@/stores/useLoadingStore'
import { useAuthStore } from '@/stores/useAuthStore'
import { defineStore, storeToRefs } from 'pinia'
import { formatDateTime } from '@/lib/utils'
import { useRouter } from 'vue-router'
import { api } from '@/api'
import { ref } from 'vue'

export const useBorrowStore = defineStore('useBorrowStore', () => {
  const borrows = ref([])
  const authStore = useAuthStore()
  const { setLoading } = useLoadingStore()
  const { token } = storeToRefs(authStore)
  const { setMessage } = authStore
  const { back } = useRouter()

  const getBorrows = async () => {
    try {
      setLoading(true)
      const response = await api.get('/borrow', {
        headers: {
          Authorization: `Bearer ${token.value}`
        }
      })
      if (response.status === 200) borrows.value = response.data.data
    } catch (error) {
      setLoading(false)
      setMessage('error', error.response.data.message ?? error.message)
    } finally {
      setLoading(false)
    }
  }
  const createBorrow = async (createBorrowInputs) => {
    try {
      setLoading(true)
      const response = await api.post(
        '/borrow',
        {
          borrow_date: formatDateTime(createBorrowInputs.borrow_date),
          load_date: formatDateTime(createBorrowInputs.load_date),
          book_id: createBorrowInputs.book_id
        },
        {
          headers: {
            Authorization: `Bearer ${token.value}`
          }
        }
      )
      if (response.status === 201) {
        setMessage('success', response.data.message)
        back()
      }
    } catch (error) {
      setMessage('error', 'Error creating borrow')
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }
  return { createBorrow, getBorrows, borrows }
})

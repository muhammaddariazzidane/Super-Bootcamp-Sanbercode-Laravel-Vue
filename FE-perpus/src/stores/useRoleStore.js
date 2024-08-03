import { useToggleSheetStore } from '@/stores/useToggleSheetStore'
import { useLoadingStore } from '@/stores/useLoadingStore'
import { useAuthStore } from '@/stores/useAuthStore'
import { storeToRefs, defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { api } from '@/api'
import { ref } from 'vue'

export const useRoleStore = defineStore('useRoleStore', () => {
  const roles = ref([])
  const authStore = useAuthStore()
  const { setIsModalOpen } = useToggleSheetStore()
  const { setLoading } = useLoadingStore()
  const { token } = storeToRefs(authStore)
  const { setMessage } = authStore
  const { back } = useRouter()

  const getRoles = async () => {
    try {
      setLoading(true)
      const response = await api.get('/role', {
        headers: {
          Authorization: `Bearer ${token.value}`
        }
      })
      if (response.status === 200) roles.value = response.data.data
    } catch (error) {
      setMessage('error', error.response.data.message ?? error.message)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }
  const createRole = async (name) => {
    try {
      const response = await api.post(
        '/role',
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
        roles.value.unshift(response.data.data)
      }
    } catch (error) {
      setMessage('error', error.response.data.message ?? error.message)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  const updateRole = async (name, id) => {
    try {
      const response = await api.post(
        `/role/${id}?_method=PUT`,
        { name: name.value },
        {
          headers: {
            Authorization: `Bearer ${token.value}`
          }
        }
      )
      if (response.status === 200) {
        roles.value = roles.value.filter((role) => role.id !== id)
        roles.value.unshift(response.data.data)
        setMessage('success', response.data.message)
        back()
      }
    } catch (error) {
      setMessage('error', 'Failed to update role')
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  const deleteRole = async (id) => {
    try {
      setLoading(true)
      const response = await api.post(`/role/${id}?_method=DELETE`, null, {
        headers: {
          Authorization: `Bearer ${token.value}`
        }
      })
      if (response.status === 200) {
        setMessage('success', response.data.message)
        roles.value = roles.value.filter((role) => role.id !== id)
      }
    } catch (error) {
      setMessage('error', error.response.data.message ?? error.message)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  return { roles, createRole, updateRole, deleteRole, getRoles }
})

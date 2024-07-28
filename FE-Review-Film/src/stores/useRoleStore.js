import { ref } from 'vue'
import { defineStore } from 'pinia'
import { api } from '@/api'
import { useAuthStore } from './useAuthStore'
import { useRouter } from 'vue-router'

export const useRoleStore = defineStore(
  'useRoleStore',
  () => {
    const { push } = useRouter()
    const { setMessage } = useAuthStore()
    const roles = ref([])
    const role = ref({})
    const isLoading = ref(false)
    const setLoading = (loading) => (isLoading.value = loading)
    const getRoles = async () => {
      setLoading(true)
      try {
        const response = await api.get('/role', {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
          }
        })
        if (response.status === 200) {
          roles.value = response.data.data
        }
      } catch (error) {
        console.error('Failed to fetch roles:', error)
      } finally {
        setLoading(false)
      }
    }

    const createRole = async (name) => {
      setLoading(true)
      try {
        const response = await api.post(
          '/role',
          { name },
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
          }
        )
        if (response.status === 201) {
          setMessage('success', response.data.message)
          await getRoles()
        }
      } catch (error) {
        setMessage('error', 'Failed to create role')
        console.error('Failed to create role:', error)
      } finally {
        setLoading(false)
      }
    }
    const updateRole = async (id, name) => {
      setLoading(true)
      try {
        const response = await api.post(
          `/role/${id}?_method=PUT`,
          { name },
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
          }
        )
        if (response.status === 200) {
          setMessage('success', response.data.message)
          await getRoles()
          push({ name: 'Dashboard Role' })
        }
      } catch (error) {
        setMessage('error', 'Failed to update role')
        console.error('Failed to update role:', error)
      } finally {
        setLoading(false)
      }
    }
    const deleteRole = async (id) => {
      setLoading(true)
      try {
        const response = await api.post(
          `/role/${id}?_method=DELETE`,
          {},
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
          }
        )
        if (response.status === 200) {
          setMessage('success', response.data.message)
          await getRoles()
        }
      } catch (error) {
        setMessage('error', 'Failed to delete role')
        console.error('Failed to delete role:', error)
      } finally {
        setLoading(false)
      }
    }
    return { roles, role, getRoles, createRole, updateRole, deleteRole, isLoading, setLoading }
  },
  {
    persist: true
  }
)

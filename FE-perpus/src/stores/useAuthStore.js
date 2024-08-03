import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'
import { api } from '@/api'
import { ref } from 'vue'

export const useAuthStore = defineStore('useAuthStore', () => {
  const { push } = useRouter()
  const token = ref(
    localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null
  )
  const user = ref(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null)
  const messages = ref({
    success: null,
    error: null
  })
  const setMessage = (type, message) => {
    messages.value[type] = message
  }
  const login = async (data) => {
    try {
      const response = await api.post('/auth/login', data)
      if (response.status === 200) {
        token.value = response.data.token
        user.value = response.data.user
        localStorage.setItem('token', JSON.stringify(response.data.token))
        localStorage.setItem('user', JSON.stringify(response.data.user))
        push({ name: 'Home' })
      }
    } catch (error) {
      if (error.response.data.message) messages.value.error = error.response.data.message
      else messages.value.error = error.message
    }
  }
  const register = async (data) => {
    try {
      const response = await api.post('/auth/register', data)
      if (response.status === 201) {
        token.value = response.data.token
        user.value = response.data.user
        localStorage.setItem('token', JSON.stringify(response.data.token))
        localStorage.setItem('user', JSON.stringify(response.data.user))
        push({ name: 'Home' })
      }
    } catch (error) {
      messages.value.error = error.message
    }
  }
  const logout = async () => {
    try {
      const response = await api.post('/auth/logout', null, {
        headers: {
          Authorization: `Bearer ${token.value}`
        }
      })
      if (response.status === 200) {
        token.value = null
        user.value = null
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        push({ name: 'Login' })
      }
    } catch (error) {
      token.value = null
      user.value = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      push({ name: 'Login' })
    }
  }

  const updateOrCreateProfile = async (data) => {
    try {
      const response = await api.post('/profile', data, {
        headers: {
          Authorization: `Bearer ${token.value}`
        }
      })
      console.log(response.data)
      messages.value.success = response.data.message
    } catch (error) {
      if (error.response && error.response.data) messages.value.error = error.response.data
      else messages.value.error = error.message
    }
  }

  return {
    setMessage,
    token,
    user,
    login,
    register,
    logout,
    messages,
    updateOrCreateProfile
  }
})

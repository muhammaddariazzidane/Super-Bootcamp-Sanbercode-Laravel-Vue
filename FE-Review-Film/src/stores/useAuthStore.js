import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { api } from '@/api'

export const useAuthStore = defineStore(
  'useAuthStore',
  () => {
    const router = useRouter()
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
        token.value = null
        user.value = null
        const response = await api.post('/auth/login', data)
        if (response.status === 200) {
          token.value = response.data.token
          user.value = response.data.user
          localStorage.setItem('token', JSON.stringify(response.data.token))
          localStorage.setItem('user', JSON.stringify(response.data.user))
          router.push('/')
        }
      } catch (error) {
        if (error.response.data.message) {
          messages.value.error = error.response.data.message
        } else {
          messages.value.error = error.message
        }
        console.log(error)
      }
    }
    const register = async (data) => {
      try {
        token.value = null
        user.value = null
        const response = await api.post('/auth/register', data)
        if (response.status === 201) {
          token.value = response.data.token
          user.value = response.data.user
          localStorage.setItem('token', JSON.stringify(response.data.token))
          localStorage.setItem('user', JSON.stringify(response.data.user))
          router.push('/')
        }
      } catch (error) {
        messages.value.error = error.message
        console.log(error.message)
      }
    }
    const logout = async () => {
      try {
        const response = await api.post(
          '/auth/logout',
          {},
          {
            headers: {
              Authorization: `Bearer ${token.value}`
            }
          }
        )
        if (response.status === 200) {
          token.value = null
          user.value = null
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          localStorage.removeItem('useFilmStore')
          localStorage.removeItem('useCastStore')
          localStorage.removeItem('useRoleStore')
          localStorage.removeItem('useFilmCastStore')
          localStorage.removeItem('useGenreStore')
          localStorage.removeItem('useRoleStore')
          router.push('/login')
          messages.value.success = response.data.message
        }
      } catch (error) {
        token.value = null
        user.value = null
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('useFilmStore')
        localStorage.removeItem('useCastStore')
        localStorage.removeItem('useRoleStore')
        localStorage.removeItem('useFilmCastStore')
        localStorage.removeItem('useGenreStore')
        localStorage.removeItem('useRoleStore')
        router.push('/login')
        console.log(error)
      }
    }
    const generateOtpCode = async (email) => {
      try {
        const response = await api.post(
          '/auth/generate-otp-code',
          {
            email
          },
          {
            headers: {
              Authorization: `Bearer ${token.value}`
            }
          }
        )
        if (response.status === 200) messages.value.success = response.data.message
      } catch (error) {
        messages.value.error = error.message
        console.log(error.message)
      }
    }
    const verifyOtpCode = async (otp) => {
      try {
        const response = await api.post(
          '/auth/verifikasi-akun',
          {
            otp
          },
          {
            headers: {
              Authorization: `Bearer ${token.value}`
            }
          }
        )
        if (response.status === 200) {
          const { data } = await api.get('/me', {
            headers: {
              Authorization: `Bearer ${token.value}`
            }
          })
          user.value = data.user
          localStorage.setItem('user', JSON.stringify(data.user))
          messages.value.success = response.data.message
          router.push('/')
        }
      } catch (error) {
        if (error.response.data.otp) {
          messages.value.error = error.response.data.otp[0]
        } else if (error.response.data.message) {
          messages.value.error = error.response.data.message
        } else {
          messages.value.error = error.message
        }
        console.log(error)
      }
    }

    const updateUser = async (name) => {
      try {
        const response = await api.post(
          '/update-user',
          { name },
          {
            headers: {
              Authorization: `Bearer ${token.value}`
            }
          }
        )
        if (response.status === 200) {
          const { data } = await api.get('/me', {
            headers: {
              Authorization: `Bearer ${token.value}`
            }
          })
          user.value = data.user
          localStorage.setItem('user', JSON.stringify(data.user))
          messages.value.success = response.data.message
        }
      } catch (error) {
        messages.value.error = error.message
        console.log(error.message)
      }
    }

    const updateOrCreateProfile = async (data) => {
      try {
        const response = await api.post('/profile', data, {
          headers: {
            Authorization: `Bearer ${token.value}`
          }
        })
        messages.value.success = response.data.message
      } catch (error) {
        if (error.response && error.response.data) {
          messages.value.error = error.response.data
        }
        messages.value.error = error.message
        console.log(error)
      }
    }

    return {
      setMessage,
      token,
      user,
      login,
      register,
      logout,
      generateOtpCode,
      verifyOtpCode,
      messages,
      updateUser,
      updateOrCreateProfile
    }
  }
)

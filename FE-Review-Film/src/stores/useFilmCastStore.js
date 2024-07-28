import { ref } from 'vue'
import { defineStore } from 'pinia'
import { api } from '@/api'
import { useAuthStore } from './useAuthStore'
import { useRouter } from 'vue-router'

export const useFilmCastStore = defineStore(
  'useFilmCastStore',
  () => {
    const { push } = useRouter()
    const { setMessage } = useAuthStore()
    const filmCasts = ref([])
    const filmCast = ref({})
    const isLoading = ref(false)
    const setLoading = (loading) => (isLoading.value = loading)

    const getFilmCasts = async () => {
      setLoading(true)
      try {
        const response = await api.get('/cast-movie')
        if (response.status === 200) {
          filmCasts.value = response.data.data
        }
      } catch (error) {
        console.error('Failed to fetch cast movie:', error)
      } finally {
        setLoading(false)
      }
    }
    const getDetailFilmCast = async (id) => {
      setLoading(true)
      try {
        const response = await api.get(`/cast-movie/${id}`)
        if (response.status === 200) {
          filmCast.value = response.data.data
        }
      } catch (error) {
        console.error('Failed to fetch cast movie detail:', error)
      } finally {
        setLoading(false)
      }
    }

    const createFilmCast = async (filmCastData) => {
      setLoading(true)
      try {
        const response = await api.post('/cast-movie', filmCastData, {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
          }
        })
        if (response.status === 201) {
          setMessage('success', response.data.message)
          await getFilmCasts()
        }
      } catch (error) {
        setMessage('error', 'failed to create cast movie')

        console.error('Failed to create cast movie:', error)
      } finally {
        setLoading(false)
      }
    }

    const updateFilmCast = async (id, filmCastData) => {
      setLoading(true)
      try {
        const response = await api.post(`/cast-movie/${id}?_method=PUT`, filmCastData, {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
          }
        })
        if (response.status === 200) {
          setMessage('success', response.data.message)
          await getFilmCasts()
          push({ name: 'Dashboard Film Cast' })
        }
      } catch (error) {
        setMessage('error', 'failed to update cast movie')

        console.error('Failed to update cast movie:', error)
      } finally {
        setLoading(false)
      }
    }

    const deleteFilmCast = async (id) => {
      setLoading(true)
      try {
        const response = await api.post(
          `/cast-movie/${id}?_method=DELETE`,
          {},
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
          }
        )
        if (response.status === 200) {
          setMessage('success', response.data.message)
          await getFilmCasts()
        }
      } catch (error) {
        setMessage('error', 'failed to delete cast movie')

        console.error('Failed to delete cast movie:', error)
      } finally {
        setLoading(false)
      }
    }

    return {
      filmCasts,
      filmCast,
      isLoading,
      setLoading,
      getFilmCasts,
      getDetailFilmCast,
      createFilmCast,
      updateFilmCast,
      deleteFilmCast
    }
  },
  {
    persist: true
  }
)

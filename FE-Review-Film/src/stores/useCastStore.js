import { ref } from 'vue'
import { defineStore } from 'pinia'
import { api } from '@/api'
import { useFilmStore } from './useFilmStore'
import { useAuthStore } from './useAuthStore'
import { useRouter } from 'vue-router'

export const useCastStore = defineStore(
  'useCastStore',
  () => {
    const { push } = useRouter()
    const { setFilms } = useFilmStore()
    const { setMessage } = useAuthStore()
    const casts = ref([])
    const cast = ref({})
    const isLoading = ref(false)
    const setLoading = (loading) => (isLoading.value = loading)

    const getCasts = async () => {
      setLoading(true)
      try {
        const response = await api.get('/cast')
        if (response.status === 200) {
          casts.value = response.data.data
        }
      } catch (error) {
        console.error('Failed to fetch casts:', error)
      } finally {
        setLoading(false)
      }
    }

    const getDetailCast = async (id) => {
      try {
        setLoading(true)
        const response = await api.get(`/cast/${id}`)
        if (response.status === 200) {
          cast.value = response.data.data
          setFilms(response.data.data.list_movies)
        }
      } catch (error) {
        console.error('Failed to fetch cast:', error)
      } finally {
        setLoading(false)
      }
    }

    const createCast = async (castData) => {
      setLoading(true)
      try {
        const response = await api.post('/cast', castData, {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
          }
        })
        if (response.status === 201) {
          setMessage('success', response.data.message)
          await getCasts()
        }
      } catch (error) {
        setMessage('error', 'Failed to create cast')
        console.error('Failed to create cast:', error)
      } finally {
        setLoading(false)
      }
    }

    const updateCast = async (id, castData) => {
      setLoading(true)
      try {
        const response = await api.post(`/cast/${id}?_method=PUT`, castData, {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
          }
        })
        if (response.status === 200) {
          setMessage('success', response.data.message)
          await getCasts()
          push({ name: 'Dashboard Cast' })
        }
      } catch (error) {
        setMessage('error', 'Failed to update cast')
        console.error('Failed to update cast:', error)
      } finally {
        setLoading(false)
      }
    }

    const deleteCast = async (id) => {
      setLoading(true)
      try {
        const response = await api.post(
          `/cast/${id}?_method=DELETE`,
          {},
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
          }
        )
        if (response.status === 200) {
          setMessage('success', response.data.message)
          await getCasts()
        }
      } catch (error) {
        setMessage('error', 'Failed to delete cast')
        console.error('Failed to delete cast:', error)
      } finally {
        setLoading(false)
      }
    }

    return {
      casts,
      cast,
      isLoading,
      setLoading,
      getDetailCast,
      deleteCast,
      createCast,
      updateCast,
      getCasts
    }
  },
  {
    persist: true
  }
)

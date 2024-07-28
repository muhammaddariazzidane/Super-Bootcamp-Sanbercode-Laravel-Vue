import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useAuthStore } from './useAuthStore'
import { useFilmStore } from './useFilmStore'
import { api } from '@/api'
import { useRouter } from 'vue-router'

export const useGenreStore = defineStore(
  'useGenreStore',
  () => {
    const { push } = useRouter()
    const { setMessage } = useAuthStore()
    const { setFilms } = useFilmStore()
    const genres = ref([])
    const genre = ref({})
    const isLoading = ref(false)
    const setLoading = (loading) => (isLoading.value = loading)

    const getGenres = async () => {
      setLoading(true)

      try {
        const response = await api.get('/genre')
        if (response.status === 200) {
          genres.value = response.data.data
        }
      } catch (error) {
        console.error('Failed to fetch genres:', error)
      } finally {
        setLoading(false)
      }
    }
    const getDetailGenre = async (id) => {
      setLoading(true)
      try {
        const response = await api.get(`/genre/${id}`)
        if (response.status === 200) {
          genre.value = response.data.data
          setFilms(response.data.data.list_movies)
        }
      } catch (error) {
        console.error('Failed to fetch genre details:', error)
      } finally {
        setLoading(false)
      }
    }
    const createGenre = async (name) => {
      setLoading(true)
      try {
        const response = await api.post(
          '/genre',
          { name },
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
          }
        )
        if (response.status === 201) {
          setMessage('success', response.data.message)
          await getGenres()
        }
      } catch (error) {
        setMessage('error', 'Failed to create genre')

        console.error('Failed to create genre:', error)
      } finally {
        setLoading(false)
      }
    }
    const updateGenre = async (id, genreData) => {
      setLoading(true)
      try {
        const response = await api.post(`/genre/${id}?_method=PUT`, genreData, {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
          }
        })
        if (response.status === 200) {
          setMessage('success', response.data.message)
          await getGenres()
          push({ name: 'Dashboard Genre' })
         
        }
      } catch (error) {
        setMessage('error', 'Failed to update genre')

        console.error('Failed to update genre:', error)
      } finally {
        setLoading(false)
      }
    }
    const deleteGenre = async (id) => {
      setLoading(true)
      try {
        const response = await api.post(
          `/genre/${id}?_method=DELETE`,
          {},
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
          }
        )
        if (response.status === 200) {
          setMessage('success', response.data.message)
          await getGenres()
        }
      } catch (error) {
        setMessage('error', 'Failed to delete genre')

        console.error('Failed to delete genre:', error)
      } finally {
        setLoading(false)
      }
    }

    return {
      genres,
      genre,
      isLoading,
      setLoading,
      getGenres,
      getDetailGenre,
      updateGenre,
      deleteGenre,
      createGenre
    }
  },
  {
    persist: true
  }
)

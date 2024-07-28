import { ref } from 'vue'
import { defineStore } from 'pinia'
import { api } from '@/api'
import { useAuthStore } from './useAuthStore'
import { useRouter } from 'vue-router'

export const useFilmStore = defineStore(
  'useFilmStore',
  () => {
    const {push} = useRouter()
    const { setMessage } = useAuthStore()
    const films = ref([])
    const film = ref({})
    const genre = ref({})
    const isLoading = ref(false)
    const setLoading = (loading) => (isLoading.value = loading)
    const setFilms = (listFilm) => {
      films.value = listFilm
    }
    const getFilms = async () => {
      setLoading(true)
      try {
        const response = await api.get('/movie')
        if (response.status === 200) {
          films.value = response.data.data
        }
      } catch (error) {
        console.error('Failed to fetch movies:', error)
      } finally {
        setLoading(false)
      }
    }
    const getDetailFilm = async (id) => {
      setLoading(true)
      try {
        const response = await api.get(`/movie/${id}`)
        if (response.status === 200) {
          film.value = response.data.data
        }
      } catch (error) {
        console.error('Failed to fetch movies:', error)
      } finally {
        setLoading(false)
      }
    }

    const createFilm = async (filmData) => {
      setLoading(true)
      try {
        let formData = new FormData();
        formData.append('poster', filmData.poster);
        formData.append('title', filmData.title);
        formData.append('summary', filmData.summary);
        formData.append('year', filmData.year);
        formData.append('genre_id', filmData.genre_id);
        
        const response = await api.post('/movie', formData, {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        if (response.status === 201) {
          setMessage('success', response.data.message)
          await getFilms()
        }
      } catch (error) {
        setMessage('error', 'Failed to create film')

        console.error('Failed to create film:', error)
      } finally {
        setLoading(false)
      }
    }

    const updateFilm = async (id, filmData) => {
      setLoading(true)
      try {
        let formData = new FormData();
        formData.append('poster', filmData.poster);
        formData.append('title', filmData.title);
        formData.append('summary', filmData.summary);
        formData.append('year', filmData.year);
        formData.append('genre_id', filmData.genre_id)

        const response = await api.post(`/movie/${id}?_method=PUT`, formData, {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
            'Content-Type': 'multipart/form-data',
          }
        })
        if (response.status === 200) {
          setMessage('success', response.data.message)
          await getFilms()
          push({name: 'Dashboard Film'})
        }
      } catch (error) {
        setMessage('error', 'Failed to update film')

        console.error('Failed to update film:', error)
      } finally {
        setLoading(false)
      }
    }

    const deleteFilm = async (id) => {
      setLoading(true)
      try {
        const response = await api.post(`/movie/${id}?_method=DELETE`, null,{
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
          }
        })
        if (response.status === 200) {
          await getFilms()
          setMessage('success', response.data.message)
        }
      } catch (error) {
        setMessage('error', 'Failed to delete film')

        console.error('Failed to delete film:', error)
      } finally {
        setLoading(false)
      }
    }

    const createReview = async (reviewData) => {
      setLoading(true)
      try {
        const response = await api.post('/review', reviewData, {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
          }
        })
        if (response.status === 201) {
          setMessage('success', response.data.message)
        }
      } catch (error) {
        setMessage('error', 'Failed to create review')
        console.error('Failed to create review:', error)
      } finally {
        setLoading(false)
      }
    }

    return {
      films,
      film,
      genre,
      isLoading,
      setLoading,
      getFilms,
      createFilm,
      updateFilm,
      deleteFilm,
      getDetailFilm,
      createReview,
      setFilms
    }
  },
  {
    persist: true
  }
)

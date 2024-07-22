<script setup>
import { ref } from 'vue'
import { watchOnce } from '@vueuse/core'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { Card, CardContent } from '@/components/ui/card'

const emblaMainApi = ref()
const emblaThumbnailApi = ref()
const selectedIndex = ref(0)

function onSelect() {
  if (!emblaMainApi.value || !emblaThumbnailApi.value) return
  selectedIndex.value = emblaMainApi.value.selectedScrollSnap()
  emblaThumbnailApi.value.scrollTo(emblaMainApi.value.selectedScrollSnap())
}

function onThumbClick(index) {
  if (!emblaMainApi.value || !emblaThumbnailApi.value) return
  emblaMainApi.value.scrollTo(index)
}

watchOnce(emblaMainApi, (emblaMainApi) => {
  if (!emblaMainApi) return

  onSelect()
  emblaMainApi.on('select', onSelect)
  emblaMainApi.on('reInit', onSelect)
})
const movies = [
  {
    title: 'The Dark Knight',
    year: 2008,
    rating: 9.0,
    genres: ['Action', 'Crime', 'Drama'],
    director: 'Christopher Nolan',
    cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart'],
    plot: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept',
    poster: 'https://images4.alphacoders.com/273/thumb-1920-273546.jpg'
  },
  {
    title: 'The incredible Hulk',
    year: 2008,
    rating: 6.7,
    genres: ['Action', 'Adventure', 'Sci-Fi'],
    director: 'Louis Leterrier',
    cast: ['Edward Norton', 'Liv Tyler', 'Tim Roth'],
    plot: 'Bruce Banner, a scientist on the run from the U.S. Government, must find a cure for the monster he turns into whenever he loses his temper.',
    poster: 'https://wallpapercave.com/wp/wp11131460.jpg'
  },
  {
    title: 'The Godfather',
    year: 1972,
    rating: 9.2,
    genres: ['Crime', 'Drama'],
    director: 'Francis Ford Coppola',
    cast: ['Marlon Brando', 'Al Pacino', 'James Caan'],
    plot: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
    poster: 'https://image.tmdb.org/t/p/original/ykY0slSctjGBqWhTJJYzIDOs9NY.jpg'
  },
  {
    title: 'Avengers: Endgame',
    year: 2019,
    rating: 8.4,
    genres: ['Action', 'Adventure', 'Drama'],
    director: 'Anthony Russo, Joe Russo',
    cast: ['Robert Downey Jr.', 'Chris Evans', 'Mark Ruffalo'],
    plot: 'After the devastating events of Avengers: Infinity War, the universe is in ruins.',
    poster: 'https://images.alphacoders.com/111/thumb-1920-1119553.jpg'
  }
]
</script>

<template>
  <div class="w-full md:w-auto py-10">
    <Carousel class="relative w-full max-w-5xl mx-auto" @init-api="(val) => (emblaMainApi = val)">
      <CarouselContent>
        <CarouselItem v-for="(movie, index) in movies" :key="index">
          <div class="p-1">
            <Card>
              <CardConten>
                <img
                  :src="movie.poster"
                  :alt="movie.title"
                  class="w-full h-fit object-center rounded-lg"
                  loading="lazy"
                />
              </CardConten>
            </Card>
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious class="md:scale-100 scale-0" />
      <CarouselNext class="md:scale-100 scale-0" />
    </Carousel>

    <Carousel
      class="relative w-full max-w-md mx-auto"
      @init-api="(val) => (emblaThumbnailApi = val)"
    >
      <CarouselContent class="flex gap-1 ml-0">
        <CarouselItem
          v-for="(movie, index) in movies"
          :key="index"
          class="pl-0 basis-1/4 cursor-pointer"
          @click="onThumbClick(index)"
        >
          <div class="p-1" :class="index === selectedIndex ? '' : 'opacity-50'">
            <Card>
              <CardContent class="flex aspect-auto items-center justify-center p-6">
                <img
                  :src="movie.poster"
                  :alt="movie.title"
                  class="w-full h-fit object-center rounded-lg"
                  loading="lazy"
                />
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  </div>
</template>

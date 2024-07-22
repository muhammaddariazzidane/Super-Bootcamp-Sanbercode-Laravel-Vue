<script setup>
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
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
  <main class="max-w-5xl mx-auto">
    <h1 class="py-4 font-semibold text-xl">List Films</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <Card v-for="(movie, index) in movies" :key="index" class="cursor-pointer">
        <CardHeader>
          <CardTitle>{{ movie.title }}</CardTitle>
          <img :src="movie.poster" :alt="movie.title" class="rounded-md mt-2" />
        </CardHeader>
        <CardContent>
          <CardDescription>{{ movie.plot }}</CardDescription>
        </CardContent>
        <CardFooter class="flex flex-col items-start justify-end gap-3">
          <p class="text-sm">Director: {{ movie.director }}</p>
          <p class="text-sm">⭐: {{ movie.rating }}</p>
        </CardFooter>
      </Card>
    </div>
  </main>
</template>

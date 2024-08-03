<script setup>
import BookPage from '@/components/pages/book/BookPage.vue'
import { BookOpenText } from 'lucide-vue-next'
</script>

<template>
  <main>
    <section>
      <div
        class="m-auto flex max-w-screen-xl grow flex-col items-center justify-start gap-6 py-14 md:gap-12 px-3 sm:px-8 lg:px-16 xl:px-32"
      >
        <BookOpenText :size="90" fill="red" />
        <div class="flex flex-1 flex-col items-center gap-6 text-center">
          <span
            class="inline-flex rounded-full border text-center font-semibold transition-all duration-300 ease-in-out h-7 px-3 py-1 text-sm leading-tight border-blue-300 bg-blue-50 text-primary"
            >DZ E-Library</span
          >
          <div class="flex max-w-lg flex-col gap-6">
            <h3 class="text-4xl font-semibold text-primary md:text-6xl">Welcome to DZ E-Library</h3>
            <h4 class="text-lg font-normal leading-7 text-gray-400">
              A place where you can find your favorite books and read them online.
            </h4>
          </div>
        </div>
      </div>
    </section>
    <BookPage />
  </main>
</template>

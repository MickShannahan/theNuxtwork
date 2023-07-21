<template>
  <section class="row justify-content-around align-items-center">
    <button :disabled="!newer" @click="changePage(newer)" class="btn btn-primary col-2">newer</button>
    <div class="col-2 text-center">{{ page }} - {{ totalPages }}</div>
    <button :disabled="!older" @click="changePage(older)" class="btn btn-primary col-2">older</button>
  </section>
</template>

<script setup>
import { postsService } from '../services/PostsService.js';
import { AppState } from '../AppState.js';


const newer = computed(() => AppState.newer)
const older = computed(() => AppState.older)
const page = computed(() => AppState.page)
const totalPages = computed(() => AppState.totalPages)

async function changePage(url) {
  try {
    console.log('getting', url)
    await postsService.getPosts(url)
  } catch (error) {
    console.error(error)
  }
}

</script>
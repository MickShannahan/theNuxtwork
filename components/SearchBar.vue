<template>
  <section class="row">
    <form @submit.prevent="search">
      <div class="input-group">
        <input v-model="searchTerm" type="text" placeholder="search posts" class="form-control">
        <button class="btn btn-info">🔍</button>
      </div>
    </form>
  </section>
</template>

<script setup>
import { postsService } from '../services/PostsService.js';


const searchTerm = ref('')

async function search() {
  try {
    const search = searchTerm.value
    await postsService.searchPosts(search)
  } catch (error) {
    console.error(error)
  }
}
</script>
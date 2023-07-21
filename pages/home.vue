<template>
  <div class="container-fluid">
    <CreatePost class="mb-2" />
    <SearchBar class="mb-2" />
    <PageButtons />
    <section class="row">

      <div v-for="post in posts" :key="post.id" class="col-12">
        <PostCard :post="post" />
      </div>

    </section>
    <PageButtons />
  </div>
</template>
<script setup>
import PageButtons from '../components/PageButtons.vue';
import { AppState } from '../AppState.js';
import { postsService } from '../services/PostsService.js';

const posts = computed(() => AppState.posts)

await getPosts()

// onMounted(() => {
//   getPosts()
// })

async function getPosts() {
  try {
    await postsService.getPosts()
  } catch (error) {
    console.error(error)
  }
}

</script>
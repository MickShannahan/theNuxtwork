<template>
  <div class="post mb-3 mt-1 bg-light">
    <div class="post-img rounded-top">
      <div class="blur"></div>
      <img v-if="post.imgUrl" :src="post.imgUrl" alt="">
    </div>
    <div>
      <section class="d-flex align-items-center justify-content-between p-2 px-4 fw-bold">

        <NuxtLink :to="`profiles/${post.creatorId}`" class="d-flex profile align-items-center">
          <img :src="post.creator.picture" />
          <span class="ms-2">{{ post.creator.name }}</span>
        </NuxtLink>

        <!-- FIXME need to bring in mdi -->
        <div @click="like">
          <i v-if="!liked" class="mdi mdi-heart-outline"></i><i v-else class="mdi mdi-heart"></i>{{ post.likes.length }}
        </div>
      </section>
      <p class="p-3">{{ post.body }}</p>
      <div class="text-end p-1">
        <button @click="deletePost" v-if="post.creatorId == account.id"
          class="btn btn-outline-danger delete">delete</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { postsService } from '../services/PostsService.js';
import { AppState } from '../AppState.js';

const account = computed(() => AppState.account)
const { post } = defineProps({ post: { type: Object, required: true } })
const liked = computed(() => post.likeIds.includes(AppState.account.id))
const bgImg = computed(() => `url(${post.imgUrl})`)

async function like() {
  try {
    await postsService.likePost(post.id)
  } catch (error) {
    console.error(error)
  }
}

async function deletePost() {
  try {
    if (window.confirm('you sure you want to delete?'))
      await postsService.deletePost(post.id)
  } catch (error) {
    console.error(error)
  }
}

</script>

<style lang="scss" scoped>
.post {
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.5);

  .post-img {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--bs-dark);
    overflow: hidden;
    background-image: v-bind(bgImg);
    background-size: cover;

    .blur {
      height: 100%;
      width: 100%;
      backdrop-filter: blur(20px);
      background-color: rgba(0, 0, 0, 0.39);
      position: absolute;
    }

    img {
      position: relative;
      height: 100%;
      max-height: 55vh;
      width: 100%;
      object-fit: contain;
    }

  }

  .delete {
    bottom: 5px;
    right: 5px;
  }
}

.profile {
  img {
    height: 50px;
    width: 50px;
    object-fit: cover;
    border-radius: 50em;
    background-color: var(--bs-primary);
  }
}
</style>
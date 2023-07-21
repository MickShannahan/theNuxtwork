<template>
  <form @submit.prevent="createPost" class="row post-form pb-3 bg-light">
    <div class="col-12 fs-4 text-primary my-2">
      Create Post
    </div>
    <div class="mb-3 col-12">
      <label for="" class="form-label">body</label>
      <textarea v-model="editable.body" required type="text" class="form-control" name="" id="" aria-describedby="helpId"
        placeholder="">min 10 characters</textarea>
    </div>
    <div class="mb-3 col-6">
      <label for="" class="form-label">image?</label>
      <input v-model="editable.imgUrl" type="text" class="form-control" name="" id="" aria-describedby="helpId"
        placeholder="">
      <small id="helpId" class="form-text text-muted">Have an image to go along?</small>
    </div>
    <div class="mb-3 col-6" v-if="editable.imgUrl">
      <label for="" class="form-label">preview</label>
      <img :src="editable.imgUrl" class="img-fluid">
    </div>
    <div class="col-12 text-end">
      <button type="submit" :disabled="!valid" class="btn btn-primary w-25">post</button>
    </div>
  </form>
</template>

<script setup>
import { postsService } from '../services/PostsService.js';


const editable = ref({})
const valid = ref(false)

watchEffect(() => {
  valid.value = editable.value.body?.length > 10
})

async function createPost() {
  try {
    await postsService.createPost(editable.value)
    editable.value = {}
  } catch (error) {
    console.error(error)
  }
}

</script>

<style lang="scss" scoped>
.post-form {
  border: 1px solid rgba($color: #000000, $alpha: .2);
  border-radius: 8px;
  box-shadow: 0px 2px 3px rgba($color: #000000, $alpha: .2);
}
</style>
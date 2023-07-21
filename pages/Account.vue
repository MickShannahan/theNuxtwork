<template>
  <section class="container">

    <div>welcome {{ account.name }}</div>
    <div>
      <img class="account-picture" :src="account.picture" alt="">
      <div>{{ account.name }}</div>
      <div>{{ account.email }}</div>
    </div>


    <form @submit.prevent="editAccount" class="row">
      <div class="mb-3 col-6">
        <label for="" class="form-label">Name</label>
        <input type="text" v-model="editable.name" class="form-control" name="" id="" aria-describedby="helpId"
          placeholder="">
      </div>
      <div class="mb-3 col-6">
        <label for="" class="form-label">Picture</label>
        <input type="text" v-model="editable.picture" class="form-control" name="" id="" aria-describedby="helpId"
          placeholder="">
      </div>
      <div class="mb-3 col-6">
        <label for="" class="form-label">Class</label>
        <input type="text" v-model="editable.class" class="form-control" name="" id="" aria-describedby="helpId"
          placeholder="">
      </div>
      <div class="mb-3 col-6">
        <label for="" class="form-label">Graduated</label>
        <input type="checkbox" v-model="editable.graduated" class="form-control checkbox" name="" id=""
          aria-describedby="helpId" placeholder="">
      </div>
      <div class="mb-3 col-6">
        <label for="" class="form-label">Bio</label>
        <textarea v-model="editable.bio" class="form-control" name="" id="" aria-describedby="helpId"
          placeholder=""></textarea>
      </div>
      <div class="mb-3 col-4">
        <label for="" class="form-label">linkedin</label>
        <input v-model="editable.linkedin" class="form-control" name="" id="" aria-describedby="helpId" placeholder="" />
      </div>
      <div class="mb-3 col-4">
        <label for="" class="form-label">github</label>
        <input v-model="editable.github" class="form-control" name="" id="" aria-describedby="helpId" placeholder="" />
      </div>
      <div class="mb-3 col-4">
        <label for="" class="form-label">resume</label>
        <input v-model="editable.resume" class="form-control" name="" id="" aria-describedby="helpId" placeholder="" />
      </div>
      <div class="mb-3 col-4">
        <label for="" class="form-label">cover image</label>
        <input v-model="editable.coverImg" class="form-control" name="" id="" aria-describedby="helpId" placeholder="" />
      </div>
      <div class="mb-3 col-4">
        <button class="btn btn-primary">save</button>
      </div>


    </form>
  </section>
</template>

<script setup>
import { AppState } from '../AppState.js';
import { accountService } from '../services/AccountService.js';

const account = computed(() => AppState.account)
const editable = ref({})

watchEffect(() => {
  editable.value = { ...AppState.account }
})

await getAccount()

async function getAccount() {
  try {
    await accountService.getAccount()
  } catch (error) {
    console.error(error)
  }
}

async function editAccount() {
  try {
    await accountService.editAccount(editable.value)
  } catch (error) {
    console.error(error)
  }
}
</script>

<style>
.account-picture {
  width: 200px;
}
</style>
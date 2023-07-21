<template>
  <div class="contaier-fluid">
    <section class="row justify-content-center">
      <div class="col-11">
        <ProfileCard :profile="profile" v-if="profile" />
      </div>
    </section>

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
import { AppState } from '../AppState.js'
import { profilesService } from '../services/ProfilesService.js'
// FIXME linter doesn't know
const route = useRoute()

const posts = computed(() => AppState.posts)
const profile = computed(() => AppState.profile)

await getProfile()

// onMounted(() => {
//   getProfile()
// })

async function getProfile() {
  try {

    let profileId = route.params.profileId
    await profilesService.getProfile(profileId)
    await profilesService.getProfilePosts(profileId)

  } catch (error) {
    console.error(error)
  }
}

</script>
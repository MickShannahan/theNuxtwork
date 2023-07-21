<template>
  <Navbar />
  <section class="container-fluid">
    <div class="row">
      <div class="col-10 mt-2">
        <KeepAlive>
          <Suspense>
            <NuxtPage />
          </Suspense>
        </KeepAlive>
      </div>
      <div class="col-2  mt-2">
        <div class="sticky-top">
          <img v-for="a in ads" :src="a.tall" :key="a.tall" class="sponsor mb-1" alt="">
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { AppState } from './AppState.js'
import { sponsorService } from './services/SponsorService.js';

const ads = computed(() => AppState.sponsors)

onMounted(() => {
  getSponsors()
})

async function getSponsors() {
  try {
    await sponsorService.getSponsors()
  } catch (error) {
    console.error(error)
  }
}

</script>

<style lang="scss" scoped>
.sponsor {
  max-height: 45vh;
  max-width: 100%;
}
</style>

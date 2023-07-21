<template>
  <div class="row profile">
    <div class="hero-img">
    </div>
    <div class="profile-details">
      <img :src="profile.picture" alt="">
      <div class="d-flex w-100 justify-content-between">
        <div class="fs-4 fw-bold text-start">
          <div>{{ profile.name }} </div>
          <div>{{ profile.class }} <span v-if="profile.graduated">🎓</span></div>

        </div>
        <div>
          <span> <a v-if="profile.linkedin" target="_blank" :href="profile.linkedin">linkedin</a></span>
          <span> <a v-if="profile.portfolio" target="_blank" :href="profile.portfolio">portfolio</a></span>
          <span> <a v-if="profile.resume" target="_blank" :href="profile.resume">resume</a></span>
        </div>
      </div>
    </div>
    <div class="mt-2">
      <p>{{ profile.bio }}</p>
    </div>
  </div>
</template>


<script setup>
const { profile } = defineProps({ profile: { type: Object, required: true } })
const bgImg = computed(() => `url(${profile.coverImg})`)
</script>

<style lang="scss" scoped>
.profile {
  border: 1px solid rgba(0, 0, 0, 0.25);
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
  border-radius: 8px
}

.hero-img {
  height: 30vh;
  background-image: v-bind(bgImg);
  background-size: cover;
}

.profile-details {
  position: relative;
  display: flex;
  text-align: center;
  justify-content: betw;

  bottom: 100px;
  margin-bottom: -100px;

  &>div {
    margin-top: 105px;

    * {
      margin-left: .25em;
    }
  }

  img {
    height: 200px;
    width: 200px;
    border-radius: 50em;
    border: 2px solid var(--bs-primary);
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.507);
  }
}
</style>
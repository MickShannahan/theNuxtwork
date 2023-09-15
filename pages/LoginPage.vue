<template>
  <Login v-if="!loading && !user.isAuthenticated" />
  <div v-else>
    loading <i class="mdi mdi-loading mdi-spin"></i>
  </div>
</template>

<script setup>
import { AppState } from '../AppState.js';
import { AuthService } from '../services/AuthService.js';
import { logger } from '../utils/Logger.js'

const router = useRouter()
const route = useRoute()


const user = computed(() => AppState.user)
const loading = computed(() => AuthService.loading)

watch(user, () => {
  logger.log('user changed', user.value.isAuthenticated, route.query)
  if (user.value.isAuthenticated) {
    const redirect = route.query.redirect
    router.push({ name: redirect || 'home' })
  }
})

</script>

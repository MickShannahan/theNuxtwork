// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/scss/main.scss'],
  // @ts-ignore
  script: [{ src: 'bootstrap/dist/js/bootstrap.bundle.min.js' }],
  vite: { vue: { customElement: true } },
  modules: ['@nuxt/devtools'],
  runtimeConfig: {
    public: {
      authDomain: process.env.AUTH_DOMAIN,
      authClientId: process.env.AUTH_CLIENT_ID,
      authAudience: process.env.AUTH_AUDIENCE
    }
  }
})

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@hypernym/nuxt-gsap'],
  colorMode: {
    preference: 'dark',
  },
  runtimeConfig: {
    public: {
      gtagId: 'GTM-WWB3PCTM',
    },
  },
})

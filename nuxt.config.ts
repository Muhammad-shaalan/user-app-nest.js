export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: "ZumraFood" || "",
      htmlAttrs: {
        lang: "en",  // it sets the language English
        dir: "ltr"
      },
    },
  },
  devtools: { enabled: false },
  css: ['~/assets/scss/main.scss', 'bootstrap/dist/css/bootstrap.css'], 
  plugins: [
    '~/plugins/ofetch'
  ],
  modules: [
    // ...
    [
      '@pinia/nuxt',
      {
        autoImports: [
          // automatically imports `defineStore`
          'defineStore',
        ],
      },
    ],
  ],
})

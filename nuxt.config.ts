// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Transport Shipment Tracker',
      meta: [
        { name: 'description', content: 'Sistem atau aplikasi yang digunakan untuk melacak dan memantau pengiriman barang/logistik selama proses transportasi' }
      ]
    },
  },
  
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxt/icon', '@nuxt/eslint'],
  css: [ '~/assets/css/styles.css'],
  ui: {
    colorMode: false
  }
})
import { defineNuxtConfig } from 'nuxt3'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
    ssr: false,
    serverMiddleware: {
        '/server/middleware': '~/server/middleware'
    }
})
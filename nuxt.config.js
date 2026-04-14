export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    mongodbUri: process.env.MONGODB_URI,
    jwt_secret: process.env.JWT_SECRET
  },
})

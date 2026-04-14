import mongoose from 'mongoose'

let isConnected = false

export const connectDB = async () => {
  if (isConnected) {
    return
  }

  //. env에서 값을 읽어 옴
  //const config = useRuntimeConfig()
  const mongodbUri = process.env.MONGODB_URI
    
  try {
    await mongoose.connect(mongodbUri, {
      dbName: 'nuxt-board'  
    })
    isConnected = true
    console.log('MongoDB Atlas 연결 성공')
    console.log('연결된 DB:', mongoose.connection.db.databaseName) 
  } catch (error) {
    console.error('MongoDB 연결 실패:', error.message)
    throw error
  }
}
import { connectDB } from '../utils/mongoose'

export default defineEventHandler(async () => {
  try {
    await connectDB()
    return { success: true, message: 'MongoDB 연결 성공!' }
  } catch (error) {
    return { success: false, message: error.message }
  }
})

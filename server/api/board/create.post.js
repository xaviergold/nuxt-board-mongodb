import { connectDB } from '../../utils/mongoose'
import { Board } from '../../models/Board'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const user = event.context.user
    
    // 입력값 검증
    if (!body.title || !body.content) {
      return {
        success: false,
        error: '제목과 내용을 입력해주세요.'
      }
    }
    
    await connectDB()
    
    // 게시물 등록
    const board = await Board.create({
      userid: user.userid,
      writer: user.name,
      title: body.title,
      content: body.content
    })
    
    return {
      success: true,
      message: '게시물이 등록되었습니다.',
      insertId: board._id
    }
  } catch (error) {
    console.error('Database error:', error)
    return {
      success: false,
      error: error.message
    }
  }
})
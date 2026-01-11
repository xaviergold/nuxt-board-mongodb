import { connectDB } from '../../utils/mongoose'
import { Board } from '../../models/Board'

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    const body = await readBody(event)
    const user = event.context.user
    
    await connectDB()
    
    // 게시물 조회
    const board = await Board.findById(id)
    
    if (!board) {
      return {
        success: false,
        error: '게시물을 찾을 수 없습니다.'
      }
    }
    
    if (board.userid !== user.userid) {
      return {
        success: false,
        error: '수정 권한이 없습니다.'
      }
    }
    
    // 게시물 수정
    await Board.findByIdAndUpdate(id, {
      title: body.title,
      content: body.content
    })
    
    return {
      success: true,
      message: '게시물이 수정되었습니다.'
    }
  } catch (error) {
    console.error('Database error:', error)
    return {
      success: false,
      error: error.message
    }
  }
})
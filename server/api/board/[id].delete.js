import { connectDB } from '../../utils/mongoose'
import { Board } from '../../models/Board'

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
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
        error: '삭제 권한이 없습니다.'
      }
    }
    
    // 게시물 삭제
    await Board.findByIdAndDelete(id)
    
    return {
      success: true,
      message: '게시물이 삭제되었습니다.'
    }
  } catch (error) {
    console.error('Database error:', error)
    return {
      success: false,
      error: error.message
    }
  }
})
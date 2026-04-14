import { connectDB } from '../../utils/mongoose'
import { Board } from '../../models/Board'

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    
    await connectDB()

    console.log('받은 id:', id)  // 디버깅용
    
    if (!id) {
      return {
        success: false,
        error: 'id가 없습니다.'
      }
    }
    
    // 조회수 증가 + 게시물 조회
    const board = await Board.findByIdAndUpdate(
      id,
      { $inc: { hitno: 1 } },
      { new: true }
    )
    
    if (!board) {
      return {
        success: false,
        error: '게시물을 찾을 수 없습니다.'
      }
    }
    
    // 이전 게시물 (현재보다 이전에 작성된 글)
    //$lt --> less than 
    //select _id from Board where regdate < board.regdate order by regdate desc
    const prev = await Board.findOne({ regdate: { $lt: board.regdate } }) 
      .sort({ regdate: -1 })
      .select('_id')    
    
    // 다음 게시물 (현재보다 이후에 작성된 글)
    //$gt --> greater than 
    const next = await Board.findOne({ regdate: { $gt: board.regdate } })
      .sort({ regdate: 1 })
      .select('_id')
    
    return {
      success: true,
      data: board,
      prev: prev,
      next: next
    }
  } catch (error) {
    console.error('Database error:', error)
    return {
      success: false,
      error: error.message
    }
  }
})
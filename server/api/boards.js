import { connectDB } from '../utils/mongoose'
import { Board } from '../models/Board'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const page = parseInt(query.page) || 1
    const limit = parseInt(query.limit) || 5
    const skip = (page - 1) * limit
    
    await connectDB()
    
    // 전체 게시글 수 조회
    const totalCount = await Board.countDocuments()
    
    // 페이지별 데이터 조회
    const rows = await Board.find()
      .sort({ regdate: -1 }) //내림차순 정렬
      .skip(skip) // 1 2 3 4 5 skip이 2이면 1 2를 제외한 3 4 5만 가져옴
      .limit(limit) //1 2 3 4 5 skip이 2고, limit가 2면 3 4만 가져옴
    
    // rownum 계산 (내림차순 번호)
    // map 함수 --> 배열의 각 요소를 변환해서 새 배열을 만듬
    const data = rows.map((row, index) => ({
      ...row.toObject(), //toObject() : MongoDB 문서를 일반 자바스크립트 객체로 변환
      rownum: totalCount - skip - index //row 객체에 rownum 필드 추가
    }))
    
    return {
      success: true,
      data: data,
      pagination: {
        currentPage: page,
        totalCount: totalCount,
        totalPages: Math.ceil(totalCount / limit),
        limit: limit
      }
    }
  } catch (error) {
    console.error('Database error:', error)
    return {
      success: false,
      error: error.message
    }
  }
})
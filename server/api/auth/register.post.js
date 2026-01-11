import bcrypt from 'bcryptjs'
import { connectDB } from '../../utils/mongoose'
import { User } from '../../models/User'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    // 입력값 검증
    if (!body.userid || !body.name || !body.password || !body.email) {
      return {
        success: false,
        error: '필수 항목을 모두 입력해주세요.'
      }
    }
    
    await connectDB()
    
    // 중복 아이디 체크
    const existing = await User.findById(body.userid)
    
    if (existing) {
      return {
        success: false,
        error: '이미 사용중인 아이디입니다.'
      }
    }
    
    // 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(body.password, 10)
    
    // 회원 등록
    await User.create({
      _id: body.userid,
      name: body.name,
      password: hashedPassword,
      email: body.email,
      job: body.job,
      hobbies: Array.isArray(body.hobbies) ? body.hobbies : [],
      gender: body.gender
    })
    
    return {
      success: true,
      message: '회원가입이 완료되었습니다.'
    }
  } catch (error) {
    console.error('Register error:', error)
    return {
      success: false,
      error: error.message
    }
  }
})
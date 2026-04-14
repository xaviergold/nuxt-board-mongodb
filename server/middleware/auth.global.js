import { verifyToken } from '../utils/jwt';

//defineEventHandler는 H3 라이브러리에 포함된 함수로 서버 요청 하나당 실행되는 함수
//event는 요청/응답 관련 모든 정보가 들어있는 객체
//JWT 기반 인증 체크
export default defineEventHandler((event) => { 
  //const url = event.node.req.url;
  //요청 URL에서 경로(pathname)만 가져옴. 예) 
  //http://localhost:3000/api/user?id=1 --> /api/user
  const url = getRequestURL(event).pathname 
  
  // 인증이 필요없는 API 경로들
  const publicPaths = [
    '/api/auth/login',
    '/api/auth/register',
    '/api/auth/logout'
  ];
  
  // public 경로면 인증 체크 안 함
  if (publicPaths.some(path => url.startsWith(path))) { //some() --> 하나라도 조건 만족하면 true
    return;
  }
  
  // API 요청이 아니면 인증 체크 안 함
  if (!url.startsWith('/api/')) {
    return;
  }
  
  // 여기부터는 인증이 필요한 API
  //쿠키로부터 auth_token 토큰을 가져옴
  const token = getCookie(event, 'auth_token');
  
  if (!token) {
    throw createError({
      statusCode: 401,
      message: '인증이 필요합니다.'
    });
  }
  
  const decoded = verifyToken(token); //정상이면 페이로드 리턴, 에러 발생하면 null 리턴
  if (!decoded) {
    throw createError({
      statusCode: 401,
      message: '유효하지 않은 토큰입니다.'
    });
  }
  
  // 사용자 정보를 event context에 저장
  event.context.user = decoded; //미들웨어 작동 중에 필요한 임시 데이터 보관 장소

  console.log(`[${url}] : JWT 확인`)
});
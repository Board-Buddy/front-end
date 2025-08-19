import { NextRequest, NextResponse } from 'next/server';

const SESSION_COOKIE_NAME = 'JSESSIONID';

// NOTE: 쿠키만으로는 세션이 만료되었는지까지는 확인 불가, 그러나 매번 확인을 요청하는 것은 서버 부하 우려
// 따라서 미들웨어에서는 접근 가능 여부만 판단, 이후는 클라이언트에서 처리
export const middleware = async (request: NextRequest) => {
  const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME);

  console.log(`cookie: ${request.cookies.getAll()}`);
  console.log(`sessionCookie: ${sessionCookie}`);

  // 세션 쿠키에 값이 존재하면 로그인된 상태로 간주, 요청 진행
  if (sessionCookie?.value) {
    console.log(`sessionCookie value: ${sessionCookie.value}`);
    return NextResponse.next();
  }

  // 세션 쿠키가 없으면 로그아웃 상태로 간주, 로그인 안내 페이지로 리다이렉트
  const url = new URL('/login/guide', request.url);

  if (request.nextUrl.searchParams.has('webview')) {
    url.searchParams.set('webview', 'true');
  }

  return NextResponse.redirect(url);
};

export const config = {
  matcher: [
    '/my/:path*',
    '/article/write/:path*',
    '/article/:articleId/:path+',
    '/chat/:path+',
    '/notifications',
    '/profile/:path+',
  ],
};

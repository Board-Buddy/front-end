'use client';

import { ChevronLeft } from 'lucide-react';
import { usePathname } from 'next/navigation';
import NotificationProvider from './NotificationProvider';

const Header = () => {
  const pathname = usePathname();

  if (
    pathname === '/' ||
    pathname === '/login' ||
    pathname === '/register/terms' ||
    pathname === '/register/accounts' ||
    pathname === '/register/additionalSettings' ||
    pathname === '/login/oauth/callback' ||
    pathname === '/login-splash'
  )
    return null;

  const headerParams: Record<string, { title: string; leftArrow: boolean }> = {
    '/': {
      title: '',
      leftArrow: false,
    },
    '/home': {
      title: '홈',
      leftArrow: false,
    },
    '/chat': {
      title: '채팅 목록',
      leftArrow: false,
    },
    '/map': {
      title: '보드게임 카페 찾기',
      leftArrow: true,
    },
    '/my': {
      title: '마이페이지',
      leftArrow: false,
    },
    '/setting/location': {
      title: '동네 설정',
      leftArrow: true,
    },
    '/write/locationSetting': {
      title: '모임 위치 선택',
      leftArrow: true,
    },
    '/notifications': {
      title: '알림',
      leftArrow: true,
    },
    '/my/edit': {
      title: '프로필 수정',
      leftArrow: true,
    },
    '/my/badges': {
      title: '나의 뱃지 목록',
      leftArrow: true,
    },
    '/my/activity': {
      title: '나의 활동',
      leftArrow: true,
    },
  };

  let title = headerParams[pathname]?.title || '';
  let leftArrow = headerParams[pathname]?.leftArrow || false;

  if (pathname.startsWith('/article/')) {
    if (pathname.includes('write')) {
      title = '모집글 작성';
      leftArrow = true;
    } else if (pathname.includes('edit')) {
      title = '모집글 수정';
      leftArrow = true;
    } else {
      title = '모집글 상세';
      leftArrow = true;
    }
  }

  if (pathname.includes('participants')) {
    title = '참가 신청 목록';
    leftArrow = true;
  }

  if (pathname.includes('chat') && pathname.split('/').length >= 3) {
    title = '채팅';
    leftArrow = true;
  }

  if (pathname.includes('profile') && pathname.split('/').length >= 3) {
    const nickname = decodeURIComponent(pathname.split('/').pop()!);
    title = `${nickname} 님의 프로필`;
    leftArrow = true;
  }

  if (pathname.includes('badges') && pathname.split('/').length >= 4) {
    const nickname = decodeURIComponent(pathname.split('/')[2]!);
    title = `${nickname} 님의 뱃지 목록`;
    leftArrow = true;
  }

  if (pathname.includes('reviews')) {
    title = '후기 작성';
    leftArrow = true;
  }

  if (pathname.includes('search')) {
    title = '검색';
    leftArrow = true;
  }

  return (
    <>
      <NotificationProvider />
      {pathname.includes('search') || pathname.includes('/home') ? (
        <>
          {leftArrow && (
            <ChevronLeft
              className="absolute mx-2 my-6 size-5 cursor-pointer"
              onClick={() => {
                window.history.back();
              }}
            />
          )}
        </>
      ) : (
        <div className="flex items-center border-b border-gray-200 px-2 py-3">
          <div className="left-section basis-1/12">
            {leftArrow && (
              <ChevronLeft
                className="size-5 cursor-pointer"
                onClick={() => {
                  window.history.back();
                }}
              />
            )}
          </div>
          <div className="title-section basis-10/12 text-center">
            <span className="text-lg font-extrabold text-gray-600">
              {title}
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;

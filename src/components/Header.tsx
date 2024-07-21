'use client';

import { useHeader } from '@/context/HeaderContext';
import { cn } from '@/utils/tailwind';
import { Bell, ChevronLeft, Ellipsis, SearchIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';

const Header = () => {
  const { settingVisible, settingContent } = useHeader();

  const pathname = usePathname();

  if (pathname === '/') return null;

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
      leftArrow: false,
    },
    '/my': {
      title: '마이페이지',
      leftArrow: false,
    },
    '/setting/location': {
      title: '동네 설정',
      leftArrow: true,
    },
  };

  let title = headerParams[pathname]?.title || '';
  let leftArrow = headerParams[pathname]?.leftArrow || false;

  if (pathname.startsWith('/article/') && pathname.split('/').length === 3) {
    title = '모집글 상세';
    leftArrow = true;
  }

  return (
    <div className="flex items-center border-b py-3 px-2 border-gray-200">
      <div className="left-section basis-1/3">
        {leftArrow && (
          <ChevronLeft
            className="w-5 h-5 cursor-pointer"
            onClick={() => {
              window.history.back();
            }}
          />
        )}
      </div>
      <div className="title-section basis-1/3 text-center">
        <span className="font-bold">{title}</span>
      </div>
      <div className="right-section ml-auto flex gap-2 items-center">
        <SearchIcon
          className={cn(
            'w-5 h-5 cursor-pointer',
            pathname === '/home' ? 'visible' : 'hidden',
          )}
        />
        <Bell
          className={cn(
            'w-5 h-5 cursor-pointer',
            pathname === '/home' ? 'visible' : 'hidden',
          )}
        />
        <Ellipsis
          className={cn(
            'w-5 h-5 cursor-pointer',
            settingVisible ? 'visible' : 'hidden',
          )}
        />
      </div>
    </div>
  );
};

export default Header;

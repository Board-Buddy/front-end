'use client';

import { cn } from '@/utils/tailwind';
import Link from 'next/link';
import { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import HomeIcon from './svg/HomeIcon';
import MapIcon from './svg/MapIcon';
import ChatIcon from './svg/ChatIcon';
import MyIcon from './svg/MyIcon';
import useIsWebView from '@/hooks/custom/useIsWebView';

const navBarList = [
  { icon: HomeIcon, to: '/home', title: '홈' },
  { icon: ChatIcon, to: '/chat', title: '채팅' },
  { icon: MapIcon, to: '/map', title: '지도' },
  { icon: MyIcon, to: '/my', title: '마이페이지' },
];

const NavBar = () => {
  const pathname = usePathname();
  const isWebView = useIsWebView();

  const focusedItem = useMemo(
    () => navBarList.find((nav) => pathname.includes(nav.to))?.title,
    [pathname],
  );

  // 웹뷰라면 내비게이션 바를 렌더링하지 않는다
  if (isWebView) {
    return null;
  }

  return (
    <ul
      className="flex h-16 items-center border-t border-gray-200 px-6 py-4"
      aria-label="메인 내비게이션 바"
    >
      {navBarList.map((item) => (
        <li
          key={item.title}
          className="basis-1/4"
          aria-label={`${item.title} 페이지로 가기`}
        >
          <Link href={item.to} className="flex flex-col items-center">
            <item.icon
              width={24}
              height={24}
              fill={
                focusedItem === item.title ? 'var(--primary)' : 'var(--muted)'
              }
              className={cn(
                'mb-1',
                focusedItem === item.title ? 'fill-primary' : 'fill-muted',
              )}
            />
            <p
              className={cn(
                'font-semibold text-xs',
                focusedItem === item.title ? 'text-primary' : 'text-muted',
              )}
            >
              {item.title}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavBar;

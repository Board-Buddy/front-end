'use client';

import { cn } from '@/utils/tailwind';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import HomeIcon from './svg/HomeIcon';
import MapIcon from './svg/MapIcon';
import ChatIcon from './svg/ChatIcon';
import MyIcon from './svg/MyIcon';
import { isWebView } from '@/hooks/custom/useAppRouter';

const NavBar = () => {
  const pathname = usePathname();

  const navBarList = [
    { icon: HomeIcon, to: '/home', title: '홈' },
    { icon: ChatIcon, to: '/chat', title: '채팅' },
    { icon: MapIcon, to: '/map', title: '지도' },
    { icon: MyIcon, to: '/my', title: '마이페이지' },
  ];

  const [focusedItem, setFocusedItem] = useState(
    navBarList.filter((nav) => pathname.includes(nav.to))[0].title,
  );

  // 웹뷰라면 내비게이션 바를 렌더링하지 않는다
  if (isWebView()) {
    return null;
  }

  return (
    <ul className="flex h-16 items-center border-t border-gray-200 px-6 py-4">
      {navBarList.map((item) => (
        <li
          key={item.title}
          className="basis-1/4"
          onClick={() => setFocusedItem(item.title)}
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

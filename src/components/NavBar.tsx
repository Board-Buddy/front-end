'use client';

import { cn } from '@/utils/tailwind';
import Link from 'next/link';
import { useState } from 'react';
import HomeIcon from './svg/HomeIcon';
import MapIcon from './svg/MapIcon';
import ChatIcon from './svg/ChatIcon';
import MyIcon from './svg/MyIcon';

const NavBar = () => {
  const navBarList = [
    { icon: HomeIcon, to: '/home', title: '홈' },
    { icon: ChatIcon, to: '/chat', title: '메시지' },
    { icon: MapIcon, to: '/map', title: '카페 위치' },
    { icon: MyIcon, to: '/my', title: '마이페이지' },
  ];

  const [focusedItem, setFocusedItem] = useState(navBarList[0].title);

  return (
    <ul className="flex items-center h-16 px-6">
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
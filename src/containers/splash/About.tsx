'use client';

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { MapPinIcon, MessageSquareIcon, StarIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';
import SundyMapShadow from '@images/sundy/sundy_map_shadow.png';
import SundyChessShadow from '@images/sundy/sundy_chess_shadow.png';
import SundyDiceShadow from '@images/sundy/sundy_dice_shadow.png';

const About = () => {
  const [api, setApi] = useState<CarouselApi>();

  const [activeIndex, setActiveIndex] = useState(0);
  const items = [
    {
      id: 1,
      icon: <MapPinIcon size={20} />,
      title: '게임카페 검색',
      description: `현재 위치 근처의
          보드게임카페를
          간편하게
          찾아볼 수 있어요`,
      image: SundyMapShadow,
      alt: '마커를 든 썬디',
    },
    {
      id: 2,
      icon: <StarIcon size={20} />,
      title: '랭킹시스템',
      description: `이번달 TOP3를
          뽑아 순위를 정해요
          TOP3에
          도전해봐요!`,
      image: SundyChessShadow,
      alt: '체스를 든 썬디',
    },
    {
      id: 3,
      icon: <MessageSquareIcon size={20} />,
      title: '리뷰 및 평가',
      description: `모임이 끝난 후
          서로 평가를 통해
          버디지수를
          올려봐요!`,
      image: SundyDiceShadow,
      alt: '주사위를 든 썬디',
    },
  ];

  useEffect(() => {
    if (!api) return;

    api.on('select', () => {
      setActiveIndex(api.selectedScrollSnap());
    });
  });

  return (
    <div className="relative h-screen w-full">
      <Carousel setApi={setApi}>
        <CarouselContent>
          {items.map((item) => (
            <CarouselItem key={item.id}>
              <div className="flex h-screen w-full -translate-y-14 flex-col justify-center p-14">
                <div className="flex items-center gap-0.5 pb-4 text-primary">
                  {item.icon}
                  <span className="font-extrabold">{item.title}</span>
                </div>
                <div className="pb-16 text-3xl font-extrabold text-gray-700">
                  {item.description.split('\n').map((line, i) => (
                    <Fragment key={i}>
                      {line}
                      <br />
                    </Fragment>
                  ))}
                </div>
                <div className="self-end">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    width={120}
                    height={215}
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      {/* Indicators */}
      <div className="absolute bottom-20 flex w-full justify-center space-x-2">
        {items.map((item) => (
          <button
            aria-label="indicator-button"
            type="button"
            key={item.id}
            className={`size-2 cursor-default rounded-full ${
              item.id === activeIndex ? 'bg-primary' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
      <Link href="/login-splash">
        <div className="absolute bottom-0 flex h-14 w-full cursor-pointer items-center justify-center bg-primary font-bold text-white">
          시작하기
        </div>
      </Link>
    </div>
  );
};

export default About;

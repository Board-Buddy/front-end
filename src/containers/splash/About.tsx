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

const About = () => {
  const [api, setApi] = useState<CarouselApi>();

  const [activeIndex, setActiveIndex] = useState(0);
  const items = [
    {
      icon: <MapPinIcon size={20} />,
      title: '게임카페 검색',
      description: `현재 위치 근처의
          보드게임카페를
          간편하게
          찾아볼 수 있어요`,
      image: '/images/sundy/sundy_map_shadow.png',
      alt: '마커를 든 썬디',
    },
    {
      icon: <StarIcon size={20} />,
      title: '랭킹시스템',
      description: `이번달 TOP3를
          뽑아 순위를 정해요
          TOP3에
          도전해봐요!`,
      image: '/images/sundy/sundy_chess_shadow.png',
      alt: '체스를 든 썬디',
    },
    {
      icon: <MessageSquareIcon size={20} />,
      title: '리뷰 및 평가',
      description: `모임이 끝난 후
          서로 평가를 통해
          버디지수를
          올려봐요!`,
      image: '/images/sundy/sundy_dice_shadow.png',
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
    <div className="relative w-full h-[100vh]">
      <Carousel setApi={setApi}>
        <CarouselContent>
          {items.map((item, index) => (
            <CarouselItem key={index}>
              <div className="w-full h-[100vh] flex flex-col justify-center p-14 -translate-y-14">
                <div className="text-primary flex items-center pb-4 gap-0.5">
                  {item.icon}
                  <span className="font-extrabold">{item.title}</span>
                </div>
                <div className="text-3xl font-extrabold text-gray-700 pb-16">
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
      <div className="absolute bottom-20 w-full flex justify-center space-x-2">
        {items.map((_, index) => (
          <button
            aria-label="indicator-button"
            type="button"
            key={index}
            className={`h-2 w-2 rounded-full ${
              index === activeIndex ? 'bg-primary' : 'bg-gray-400'
            }`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
      <Link href="/login">
        <div className="absolute bottom-0 w-full h-14 bg-primary text-white flex items-center justify-center font-bold cursor-pointer">
          시작하기
        </div>
      </Link>
    </div>
  );
};

export default About;

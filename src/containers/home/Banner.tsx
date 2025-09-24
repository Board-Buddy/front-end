'use client';

import Image from 'next/image';
import FirstBanner from '@images/banner/banner_1.jpg';
import SecondBanner from '@images/banner/banner_2.jpg';
import ThirdBanner from '@images/banner/banner_3.jpg';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

const Banner = () => {
  return (
    <Carousel
      opts={{ loop: true }}
      plugins={[
        Autoplay({
          delay: 4000,
        }),
      ]}
      aria-label="배너"
    >
      <CarouselContent className="m-0">
        <CarouselItem className="pl-0">
          <Image
            src={FirstBanner}
            width={448}
            height={300}
            alt="보드게임 할 사람, 여기 버디 모여라!"
            priority // 우선순위가 높다고 간주하여 preload, lazy loading 비활성화
            placeholder="blur"
          />
        </CarouselItem>
        <CarouselItem className="pl-0">
          <Image
            src={SecondBanner}
            width={448}
            height={300}
            alt="모임에 참여하고 당신의 보드버디를 늘려보세요"
            priority
            placeholder="blur"
          />
        </CarouselItem>
        <CarouselItem className="pl-0">
          <Image
            src={ThirdBanner}
            width={448}
            height={300}
            alt="좋은 후기로 인기 버디가 되어보세요!"
            priority
            placeholder="blur"
          />
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
};
export default Banner;

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
    >
      <CarouselContent className="m-0">
        <CarouselItem className="pl-0">
          <Image
            src={FirstBanner}
            width={448}
            height={300}
            alt="banner_1"
            priority // 우선순위가 높다고 간주하여 preload, lazy loading 비활성화
            placeholder="blur"
          />
        </CarouselItem>
        <CarouselItem className="pl-0">
          <Image
            src={SecondBanner}
            width={448}
            height={300}
            alt="banner_2"
            priority
            placeholder="blur"
          />
        </CarouselItem>
        <CarouselItem className="pl-0">
          <Image
            src={ThirdBanner}
            width={448}
            height={300}
            alt="banner_3"
            priority
            placeholder="blur"
          />
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
};
export default Banner;

'use client';

import Image from 'next/image';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import '@/styles/carousel.css';
import FirstBanner from '@images/banner/banner_1.jpg';
import SecondBanner from '@images/banner/banner_2.jpg';
import ThirdBanner from '@images/banner/banner_3.jpg';

const Banner = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <Carousel
      draggable
      swipeable
      arrows={false}
      responsive={responsive}
      infinite
      containerClass="carousel-container"
      autoPlay
      autoPlaySpeed={4000}
    >
      <Image
        src={FirstBanner}
        width={448}
        height={300}
        alt="banner_1"
        priority
      />
      <Image
        src={SecondBanner}
        width={448}
        height={300}
        alt="banner_2"
        priority
      />
      <Image
        src={ThirdBanner}
        width={448}
        height={300}
        alt="banner_3"
        priority
      />
    </Carousel>
  );
};
export default Banner;

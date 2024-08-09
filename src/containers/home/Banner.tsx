'use client';

import Image from 'next/image';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import '@/styles/carousel.css';
// import CustomDot from './CustomDot';

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
      // showDots
      // customDot={<CustomDot />}
      responsive={responsive}
      infinite
      containerClass="carousel-container"
      autoPlay
      autoPlaySpeed={4000}
    >
      <Image
        src="/images/banner/banner_1.jpeg"
        width={448}
        height={300}
        alt="banner_1"
        priority
      />
      <Image
        src="/images/banner/banner_2.jpeg"
        width={448}
        height={300}
        alt="banner_2"
        priority
      />
      <Image
        src="/images/banner/banner_3.jpeg"
        width={448}
        height={300}
        alt="banner_2"
        priority
      />
    </Carousel>
  );
};
export default Banner;

'use client';

import Image from 'next/image';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import '@/styles/carousel.css';
import CustomDot from './CustomDot';

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
      showDots
      customDot={<CustomDot />}
      responsive={responsive}
      ssr // means to render carousel on server-side.
      infinite
      containerClass="carousel-container"
      className="rounded-xl h-40 shadow-md mb-4"
    >
      <Image
        src="/images/banner/banner_1.jpg"
        width={416}
        height={160}
        alt="banner_1"
      />
      <Image
        src="/images/banner/banner_2.jpg"
        width={416}
        height={160}
        alt="banner_2"
      />
    </Carousel>
  );
};
export default Banner;

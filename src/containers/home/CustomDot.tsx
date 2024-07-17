import { cn } from '@/utils/tailwind';
import React from 'react';
import { DotProps } from 'react-multi-carousel';

const CustomDot = ({ index, active, onClick, carouselState }: DotProps) => {
  return (
    <button
      className={cn(
        'size-1.5 rounded-full bg-black  mb-3 ',
        active ? 'bg-opacity-70' : 'bg-opacity-30',
      )}
      onClick={() => onClick!()}
    ></button>
  );
};

export default CustomDot;

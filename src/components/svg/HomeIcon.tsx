import * as React from 'react';
import { SVGProps } from 'react';
const HomeIcon = ({ fill, ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={24}
    fill={fill || '#A0ABC0'}
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        fill={fill || '#A0ABC0'}
        fillRule="evenodd"
        d="M13.603 2.688a2 2 0 0 0-2.456 0l-8.384 6.52C2.011 9.795 2.425 11 3.378 11h.997v8a2 2 0 0 0 2 2h5v-7a1 1 0 0 1 2 0v7h5a2 2 0 0 0 2-2v-8h.997c.952 0 1.368-1.205.615-1.791l-8.384-6.521Z"
        clipRule="evenodd"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M.375 0h24v24h-24z" />
      </clipPath>
    </defs>
  </svg>
);
export default HomeIcon;

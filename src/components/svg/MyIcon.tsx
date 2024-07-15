import * as React from 'react';
import { SVGProps } from 'react';
const MyIcon = ({ fill, ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={24}
    fill={fill || '#A0ABC0'}
    {...props}
  >
    <path
      fill={fill || '#A0ABC0'}
      fillRule="evenodd"
      d="M12.625 2c5.523 0 10 4.477 10 10a9.959 9.959 0 0 1-2.258 6.33l.02.022-.132.112A9.98 9.98 0 0 1 12.625 22c-2.95 0-5.6-1.277-7.43-3.307l-.2-.23-.132-.11.02-.024A9.958 9.958 0 0 1 2.625 12c0-5.523 4.477-10 10-10Zm0 15c-1.86 0-3.541.592-4.793 1.406A7.965 7.965 0 0 0 12.625 20a7.965 7.965 0 0 0 4.793-1.594A8.897 8.897 0 0 0 12.625 17Zm0-13a8 8 0 0 0-6.258 12.984C7.988 15.821 10.2 15 12.625 15s4.637.821 6.258 1.984A8 8 0 0 0 12.625 4Zm0 2a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"
      clipRule="evenodd"
    />
  </svg>
);
export default MyIcon;

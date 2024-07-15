import * as React from 'react';
import { SVGProps } from 'react';
const ChatIcon = ({ fill, ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={24}
    fill={fill || '#A0ABC0'}
    {...props}
  >
    <path
      fill={fill || '#A0ABC0'}
      d="M17.125 3a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5h-14a1 1 0 0 1-1-1V8a5 5 0 0 1 5-5h10Zm0 2h-10a3 3 0 0 0-3 3v11h13a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3Zm-8 5a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1Zm6 0a1 1 0 0 1 .993.883l.007.117v2a1 1 0 0 1-1.993.117L14.125 13v-2a1 1 0 0 1 1-1Z"
    />
  </svg>
);
export default ChatIcon;

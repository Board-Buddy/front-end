import { Button } from '@/components/ui/button';
import { cn } from '@/utils/tailwind';
import React from 'react';

const ApplyButton = ({
  participationStatus,
}: {
  participationStatus: string;
}) => {
  const buttonStyles: { [key: string]: { [key: string]: string } } = {
    author: {
      text: '신청 목록',
    },
    permitted: {
      text: '승인됨',
    },
    waiting: {
      text: '승인 대기중',
    },
    none: {
      text: '참가 신청',
    },
  };

  return (
    <Button
      className={cn(
        'w-[392px] text-white font-bold text-md h-12 shadow-lg sticky left-7 bottom-4',
      )}
    >
      {buttonStyles[participationStatus].text}
    </Button>
  );
};

export default ApplyButton;

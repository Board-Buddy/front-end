'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/utils/tailwind';
import { useState } from 'react';
import WithdrawalAlertModal from './WithdrawalAlertModal';

const WithdrawalButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="px-4 mb-8">
        <Button
          className={cn(
            'w-full text-red-500 font-bold text-md h-12 border border-red-500 bg-white',
          )}
          onClick={() => setOpen(true)}
        >
          탈퇴하기
        </Button>
      </div>
      <WithdrawalAlertModal open={open} setOpen={setOpen} />
    </>
  );
};

export default WithdrawalButton;

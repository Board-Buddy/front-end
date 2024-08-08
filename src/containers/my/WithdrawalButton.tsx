'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/utils/tailwind';
import { useState } from 'react';
import CustomAlert from '@/components/CustomAlert';
import { useWithdrawal } from '@/hooks/useAuth';

const WithdrawalButton = () => {
  const [open, setOpen] = useState(false);
  const mutation = useWithdrawal();

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
      <CustomAlert
        open={open}
        setOpen={setOpen}
        title="정말 탈퇴하시겠어요?"
        description="그동안의 모든 기록이 삭제되며, 복구 불가능합니다"
        cancelText="아니요"
        confirmText="네"
        onConfirm={() => mutation.mutate()}
      />
    </>
  );
};

export default WithdrawalButton;

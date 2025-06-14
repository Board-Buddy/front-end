'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import CustomAlert from '@/components/CustomAlert';
import { useWithdrawal } from '@/hooks/useAuth';

const WithdrawalButton = () => {
  const [open, setOpen] = useState(false);
  const mutation = useWithdrawal();

  return (
    <>
      <div className="basis-1/2">
        <Button
          className="h-8 w-full rounded-xl bg-[#f9ecd1] text-sm text-primary"
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

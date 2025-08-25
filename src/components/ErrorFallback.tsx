import React from 'react';
import { Button } from './ui/button';

interface Props {
  reset: any;
  errMsg?: string;
}

const ErrorFallback = ({ reset, errMsg }: Props) => {
  return (
    <div className="flex h-[200px] flex-col items-center justify-center">
      <p className="mb-2 text-gray-700">{errMsg ?? '오류가 발생했습니다.'}</p>
      <Button onClick={() => reset()} className="rounded-3xl text-white">
        다시 시도하기
      </Button>
    </div>
  );
};

export default ErrorFallback;

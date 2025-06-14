import React from 'react';
import { Button } from './ui/button';

interface Props {
  reset: any;
  errMsg?: string;
}

const ErrorFallback = ({ reset, errMsg }: Props) => {
  return (
    <div className="flex h-[200px] flex-col items-center justify-center">
      <p className="mb-2 font-bold text-gray-900">
        {errMsg ?? '오류가 발생했습니다.'}
      </p>
      <Button
        onClick={() => reset()}
        className="h-8 w-20 rounded-3xl text-sm font-bold text-white"
      >
        다시 시도
      </Button>
    </div>
  );
};

export default ErrorFallback;

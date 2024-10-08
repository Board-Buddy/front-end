import React from 'react';
import { Button } from './ui/button';

interface Props {
  reset: any;
  errMsg?: string;
}

const ErrorFallback = ({ reset, errMsg }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center h-[200px]">
      <p className="font-bold mb-2 text-gray-900">
        {errMsg ?? '오류가 발생했습니다.'}
      </p>
      <Button
        onClick={() => reset()}
        className="text-white text-sm font-bold w-20 rounded-3xl h-8"
      >
        다시 시도
      </Button>
    </div>
  );
};

export default ErrorFallback;

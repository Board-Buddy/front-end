import React from 'react';

const SentMessage = () => {
  return (
    <div className="flex items-end gap-2">
      <span className="ml-auto text-xs text-gray-600">오후 8:46</span>
      <div className="bg-primary rounded-3xl rounded-tr-none max-w-60 py-2 px-4 text-white text-sm">
        메시지 짧은 버전
      </div>
    </div>
  );
};

export default SentMessage;

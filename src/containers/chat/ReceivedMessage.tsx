import CustomAvatar from '@/components/CustomAvatar';
import React from 'react';

const ReceivedMessage = () => {
  return (
    <div className="flex gap-2">
      <CustomAvatar src={null} rank={null} nickname="yubin" avatarSize="xs" />
      <div>
        <span className="text-xs text-gray-600">닉네임</span>
        <div className="mt-1 bg-gray-100 rounded-3xl rounded-tl-none max-w-60 py-2 px-4 text-sm">
          메시지 내용 긴 버전 메시지 내용 긴 버전 메시지 내용 긴 버전 메시지
          내용 긴 버전 메시지 내용 긴 버전 메시지 내용 긴 버전
        </div>
      </div>
      <span className="text-xs text-gray-600 self-end">오후 8:46</span>
    </div>
  );
};

export default ReceivedMessage;

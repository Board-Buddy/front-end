'use client';

import ReceivedMessage from './ReceivedMessage';
import SentMessage from './SentMessage';

const ChatSection = () => {
  return (
    <div className="h-[calc(100vh-222px)] overflow-y-auto">
      <div className="flex flex-col p-4 gap-6">
        <SentMessage />
        <ReceivedMessage />
      </div>
    </div>
  );
};

export default ChatSection;

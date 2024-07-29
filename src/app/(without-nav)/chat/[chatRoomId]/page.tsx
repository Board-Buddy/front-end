'use client';

import ArticleInfo from '@/containers/chat/ArticleInfo';
import ChatInput from '@/containers/chat/ChatInput';
import ChatSection from '@/containers/chat/ChatSection';

const Page = () => {
  return (
    <>
      <ArticleInfo />
      <ChatSection />
      <ChatInput />
    </>
  );
};

export default Page;

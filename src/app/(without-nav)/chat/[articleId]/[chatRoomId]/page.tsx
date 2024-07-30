import ArticleInfo from '@/containers/chat/ArticleInfo';
import ChatInput from '@/containers/chat/ChatInput';
import ChatSection from '@/containers/chat/ChatSection';

const Page = ({
  params,
}: {
  params: { articleId: string; chatId: string };
}) => {
  return (
    <>
      <ArticleInfo articleId={params.articleId} />
      <ChatSection />
      <ChatInput />
    </>
  );
};

export default Page;

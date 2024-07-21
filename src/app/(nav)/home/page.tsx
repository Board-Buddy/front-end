import Banner from '@/containers/home/Banner';
import ArticleList from '@/containers/home/ArticleList';
import Ranking from '@/containers/home/Ranking';
import WriteButton from '@/containers/home/WriteButton';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

const page = () => {
  return (
    <>
      <Banner />
      <Ranking />
      <ArticleList />
      <div className="text-center translate-y-5 text-gray-600 text-sm">
        모든 글을 확인하셨습니다
      </div>
      <WriteButton />
    </>
  );
};

export default page;

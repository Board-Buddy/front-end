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
      <WriteButton />
    </>
  );
};

export default page;

import Banner from '@/containers/home/Banner';
import Ranking from '@/containers/home/Ranking';
import NotificationButton from '@/containers/home/NotificationButton';
import ArticleListContainer from '@/containers/home/ArticleListContainer';
import HomeSearchInput from '@/containers/search/HomeSearchInput';

const page = async () => {
  return (
    <div>
      <NotificationButton />
      <Banner />
      <HomeSearchInput />
      <Ranking />
      <div className="p-8 pt-2">
        <ArticleListContainer />
      </div>
    </div>
  );
};

export default page;

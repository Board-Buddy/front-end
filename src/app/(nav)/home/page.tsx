import Banner from '@/containers/home/Banner';
import LocationSettingButton from '@/containers/home/LocationSettingButton';
import ArticleList from '@/containers/home/ArticleList';
import Ranking from '@/containers/home/Ranking';
import Filter from '@/containers/home/Filter';
import WriteButton from '@/containers/home/WriteButton';

const page = () => {
  return (
    <>
      <Banner />
      <Ranking />
      <LocationSettingButton />
      <Filter />
      <ArticleList />
      <div className="text-center translate-y-5 text-gray-600 text-sm">
        모든 글을 확인하셨습니다
      </div>
      <WriteButton />
    </>
  );
};

export default page;

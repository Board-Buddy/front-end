import Banner from '@/containers/home/Banner';
import LocationSettingButton from '@/containers/home/LocationSettingButton';
import ArticleList from '@/containers/home/ArticleList';
import Ranking from '@/containers/home/Ranking';
import Filter from '@/containers/home/Filter';

const page = () => {
  return (
    <div>
      <Banner />
      <Ranking />
      <LocationSettingButton />
      <Filter />
      <ArticleList />
    </div>
  );
};

export default page;

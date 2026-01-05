import SearchInput from './SearchInput';
import BackButton from '@/components/BackButton';
import ArticleListContainer from './ArticleListContainer';
import { getIsWebView } from '@/utils/getIsWebView';

const Search = async () => {
  const isWebView = await getIsWebView();

  return (
    <>
      <div className="flex items-center gap-2">
        {!isWebView && <BackButton />}
        <SearchInput />
      </div>
      <ArticleListContainer />
    </>
  );
};

export default Search;

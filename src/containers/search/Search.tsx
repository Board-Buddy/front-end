'use client';

import SearchInput from './SearchInput';
import BackButton from '@/components/BackButton';
import ArticleListContainer from './ArticleListContainer';

const Search = () => {
  return (
    <>
      <div className="flex items-center gap-2">
        <BackButton />
        <SearchInput />
      </div>
      <div className="px-2 pt-1">
        <ArticleListContainer />
      </div>
    </>
  );
};

export default Search;

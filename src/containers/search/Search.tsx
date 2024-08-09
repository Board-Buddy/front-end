'use client';

import React, { useEffect, useState } from 'react';
import { useSearchResultRefetch } from '@/hooks/custom/useSearchResultRefetch';
import SearchInput from './SearchInput';
import SearchResult from './SearchResult';

const Search = () => {
  const [keyword, setKeyword] = useState('');

  const { refetch, isRefetching } = useSearchResultRefetch(keyword);

  useEffect(() => {});

  return (
    <div>
      <SearchInput
        keyword={keyword}
        setKeyword={setKeyword}
        refetch={refetch}
      />
      <SearchResult keyword={keyword} isRefetching={isRefetching} />
    </div>
  );
};

export default Search;

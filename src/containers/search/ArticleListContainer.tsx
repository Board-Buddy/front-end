'use client';

import ArticleList from '../../components/articleList/ArticleList';
import {
  useKeywordSelector,
  useSearchFilterStore,
  useSggSelector,
  useSidoSelector,
  useSortSelector,
  useStatusSelector,
} from '@/store/searchFilterStore';

const ArticleListContainer = () => {
  const status = useStatusSelector();
  const sort = useSortSelector();
  const sido = useSidoSelector();
  const sgg = useSggSelector();
  const keyword = useKeywordSelector();

  const setStatus = useSearchFilterStore((state) => state.setStatus);
  const setSort = useSearchFilterStore((state) => state.setSort);

  return (
    <ArticleList
      emptyGuideMessage="검색 결과가 없습니다"
      status={status}
      sort={sort}
      sido={sido}
      sgg={sgg}
      keyword={keyword}
      setStatus={setStatus}
      setSort={setSort}
    />
  );
};

export default ArticleListContainer;

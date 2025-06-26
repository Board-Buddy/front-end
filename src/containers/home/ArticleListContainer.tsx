'use client';

import {
  useArticleFilterStore,
  useKeywordSelector,
  useProvinceSelector,
  useSggSelector,
  useSidoSelector,
  useSortSelector,
  useStatusSelector,
} from '@/store/articleFilterStore';
import ArticleList from '../../components/articleList/ArticleList';

const ArticleListContainer = () => {
  const status = useStatusSelector();
  const sort = useSortSelector();
  const sido = useSidoSelector();
  const sgg = useSggSelector();
  const keyword = useKeywordSelector();
  const province = useProvinceSelector();

  const setStatus = useArticleFilterStore((state) => state.setStatus);
  const setSort = useArticleFilterStore((state) => state.setSort);

  return (
    <ArticleList
      emptyGuideMessage="작성된 모집글이 없습니다"
      status={status}
      sort={sort}
      sido={sido}
      sgg={sgg}
      keyword={keyword}
      setStatus={setStatus}
      setSort={setSort}
      province={province}
    />
  );
};

export default ArticleListContainer;

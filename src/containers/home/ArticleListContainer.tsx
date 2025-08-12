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
import { STATE_KEYS } from '@/utils/webview';
import useRestoreAppState from '@/hooks/custom/useRestoreAppState';
import { ArticleParams } from '@/store/createArticleFilterStore';
import { useCallback, useMemo, useState } from 'react';

const ArticleListContainer = () => {
  const [restoredState, setRestoredState] =
    useState<Partial<ArticleParams> | null>(null);

  const onRestore = useCallback((state: Partial<ArticleParams>) => {
    setRestoredState(state);
  }, []);

  useRestoreAppState<Partial<ArticleParams>>(
    STATE_KEYS.ARTICLE_FILTER,
    onRestore,
  );

  const status = useStatusSelector();
  const sort = useSortSelector();
  const sido = useSidoSelector();
  const sgg = useSggSelector();
  const keyword = useKeywordSelector();
  const province = useProvinceSelector();

  const setStatus = useArticleFilterStore((state) => state.setStatus);
  const setSort = useArticleFilterStore((state) => state.setSort);

  const merged = useMemo(
    () => ({
      status: restoredState?.status ?? status,
      sort: restoredState?.sort ?? sort,
      sido: restoredState?.sido ?? sido,
      sgg: restoredState?.sgg ?? sgg,
      keyword: restoredState?.keyword ?? keyword,
      province: restoredState?.province ?? province,
    }),
    [restoredState, status, sort, sido, sgg, keyword, province],
  );

  return (
    <ArticleList
      emptyGuideMessage="작성된 모집글이 없습니다"
      status={merged.status}
      sort={merged.sort}
      sido={merged.sido}
      sgg={merged.sgg}
      keyword={merged.keyword}
      setStatus={setStatus}
      setSort={setSort}
      province={merged.province}
    />
  );
};

export default ArticleListContainer;

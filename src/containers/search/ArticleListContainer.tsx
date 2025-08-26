'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import ArticleList from '../../components/articleList/ArticleList';
import {
  useKeywordSelector,
  useProvinceSelector,
  useSearchFilterStore,
  useSggSelector,
  useSidoSelector,
  useSortSelector,
  useStatusSelector,
} from '@/store/searchFilterStore';
import { ArticleParams } from '@/store/createArticleFilterStore';
import useRestoreAppState from '@/hooks/custom/useRestoreAppState';
import { postRNMessage, STATE_KEYS } from '@/utils/webview';
import { MessageType } from '@/types/webview';

const ArticleListContainer = () => {
  const [restoredState, setRestoredState] =
    useState<Partial<ArticleParams> | null>(null);

  const onRestore = useCallback((state: Partial<ArticleParams>) => {
    setRestoredState(state);
  }, []);

  useRestoreAppState<Partial<ArticleParams>>(
    STATE_KEYS.SEARCH_FILTER,
    onRestore,
  );

  const status = useStatusSelector();
  const sort = useSortSelector();
  const sido = useSidoSelector();
  const sgg = useSggSelector();
  const keyword = useKeywordSelector();
  const province = useProvinceSelector();

  const setStatus = useSearchFilterStore((state) => state.setStatus);
  const setSort = useSearchFilterStore((state) => state.setSort);

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

  useEffect(() => {
    // keyword가 바뀔 때마다 상태 복구 요청
    postRNMessage(MessageType.REGISTER_STATE, {
      key: STATE_KEYS.SEARCH_FILTER,
    });
  }, [keyword]);

  return (
    <ArticleList
      emptyGuideMessage="검색 결과가 없습니다"
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

import { createArticleFilterStore } from './createArticleFilterStore';

export const useArticleFilterStore = createArticleFilterStore();

export const useStatusSelector = () =>
  useArticleFilterStore((state) => state.status);
export const useSortSelector = () =>
  useArticleFilterStore((state) => state.sort);
export const useSidoSelector = () =>
  useArticleFilterStore((state) => state.sido);
export const useProvinceSelector = () =>
  useArticleFilterStore((state) => state.province);
export const useSggSelector = () => useArticleFilterStore((state) => state.sgg);
export const useKeywordSelector = () =>
  useArticleFilterStore((state) => state.keyword);

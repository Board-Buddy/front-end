import { createArticleFilterStore } from './createArticleFilterStore';

export const useSearchFilterStore = createArticleFilterStore();

export const useStatusSelector = () =>
  useSearchFilterStore((state) => state.status);
export const useSortSelector = () =>
  useSearchFilterStore((state) => state.sort);
export const useSidoSelector = () =>
  useSearchFilterStore((state) => state.sido);
export const useProvinceSelector = () =>
  useSearchFilterStore((state) => state.province);
export const useSggSelector = () => useSearchFilterStore((state) => state.sgg);
export const useKeywordSelector = () =>
  useSearchFilterStore((state) => state.keyword);

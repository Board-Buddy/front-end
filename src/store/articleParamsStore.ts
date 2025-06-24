import { Province } from './../types/location';
import { GetArticleRequestParams } from '@/types/article';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const ARTICLE_PARAMS_STORAGE_KEY = 'article-params';

interface ArticleParamsState extends GetArticleRequestParams {
  province: Province | null;

  setStatus: (status: string | null) => void;
  setSort: (sort: string | null) => void;
  setSido: (sido: string | null) => void;
  setSgg: (sgg: string | null) => void;
  setKeyword: (keyword: string | null) => void;
  setProvince: (province: Province | null) => void;
  clear: () => void;
}

export const useArticleParamsStore = create<ArticleParamsState>()(
  persist(
    (set) => ({
      status: null,
      sort: null,
      sido: null,
      province: null,
      sgg: null,
      keyword: null,

      setStatus: (status: string | null) => set({ status }),
      setSort: (sort: string | null) => set({ sort }),
      setSido: (sido: string | null) => set({ sido }),
      setProvince: (province: Province | null) => set({ province }),
      setSgg: (sgg: string | null) => set({ sgg }),
      setKeyword: (keyword: string | null) => set({ keyword }),
      clear: () => {
        set({
          status: null,
          sort: null,
          sido: null,
          province: null,
          sgg: null,
          keyword: null,
        });

        if (typeof window === 'undefined') return;

        localStorage.removeItem(ARTICLE_PARAMS_STORAGE_KEY);
      },
    }),
    {
      name: ARTICLE_PARAMS_STORAGE_KEY,
      partialize: (state) => ({
        status: state.status,
        sort: state.sort,
        sido: state.sido,
        province: state.province,
        sgg: state.sgg,
      }),
    },
  ),
);

export const useStatusSelector = () =>
  useArticleParamsStore((state) => state.status);
export const useSortSelector = () =>
  useArticleParamsStore((state) => state.sort);
export const useSidoSelector = () =>
  useArticleParamsStore((state) => state.sido);
export const useProvinceSelector = () =>
  useArticleParamsStore((state) => state.province);
export const useSggSelector = () => useArticleParamsStore((state) => state.sgg);
export const useKeywordSelector = () =>
  useArticleParamsStore((state) => state.keyword);

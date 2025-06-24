import { Province } from './../types/location';
import { GetArticleRequestParams } from '@/types/article';
import { create } from 'zustand';

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

export const createArticleFilterStore = () =>
  create<ArticleParamsState>()((set) => ({
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
    clear: () =>
      set({
        status: null,
        sort: null,
        sido: null,
        province: null,
        sgg: null,
        keyword: null,
      }),
  }));

import { UserInfo } from '@/types/user';
import { create } from 'zustand';

export interface UserInfoStore {
  userInfo: UserInfo | null;
  setUserInfo: (userInfo: Partial<UserInfo> | null) => void;
  getUserInfo: () => UserInfo | null;
  clearUserInfo: () => void;
}

export const useUserInfoStore = create<UserInfoStore>()((set, get) => ({
  userInfo: null,

  setUserInfo: (info: Partial<UserInfo> | null) => {
    if (info === null) {
      set({ userInfo: null });
      return;
    }

    set((previous) => ({
      userInfo: { ...previous.userInfo, ...info } as UserInfo,
    }));
  },
  getUserInfo: () => get().userInfo,
  clearUserInfo: () => set({ userInfo: null }),
}));

export const useUserInfoSelector = () =>
  useUserInfoStore((state) => state.userInfo);

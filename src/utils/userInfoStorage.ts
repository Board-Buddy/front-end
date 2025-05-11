import { UserInfo } from '@/types/user';
import { localStorageUtil } from './localStorageUtil';

const USER_LOCALSTORAGE_KEY = 'user';

export const setUserInfo = (userInfo: UserInfo) =>
  localStorageUtil.set(USER_LOCALSTORAGE_KEY, userInfo);

export const getUserInfo = (): UserInfo | null =>
  localStorageUtil.get(USER_LOCALSTORAGE_KEY);

export const removeUserInfo = () =>
  localStorageUtil.remove(USER_LOCALSTORAGE_KEY);

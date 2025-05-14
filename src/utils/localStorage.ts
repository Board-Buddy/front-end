import { UserInfo } from '@/types/user';

const USER_LOCALSTORAGE_KEY = 'user';

export const setStoredUser = (userInfo: UserInfo) => {
  localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(userInfo));
};

export const getStoredUser = (): UserInfo | null => {
  const userInfo = localStorage.getItem(USER_LOCALSTORAGE_KEY);
  return userInfo ? JSON.parse(userInfo) : null;
};

export const clearStoredUser = () => {
  localStorage.removeItem(USER_LOCALSTORAGE_KEY);
};

export const localStorageUtil = {
  set<T>(key: string, value: T) {
    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(key, serialized);
    } catch (error) {
      console.error(`localStorage set error for key "${key}":`, error);
    }
  },

  get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      if (item === null) return null;
      return JSON.parse(item) as T;
    } catch (error) {
      console.error(`localStorage get error for key "${key}":`, error);
      return null;
    }
  },

  remove(key: string) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`localStorage remove error for key "${key}":`, error);
    }
  },

  clear() {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('localStorage clear error:', error);
    }
  },
};

export type RequiredOnly<T> = {
  [K in keyof T as Record<string, never> extends Pick<T, K> ? never : K]: T[K];
};

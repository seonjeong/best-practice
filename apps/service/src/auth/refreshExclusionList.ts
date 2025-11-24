export const REFRESH_EXCLUSION_LIST = ['/login', '/refresh', '/sign-up'] as const;

export const isRefreshExcluded = (url: string) => {
  return REFRESH_EXCLUSION_LIST.some((path: string) => url.includes(path));
};

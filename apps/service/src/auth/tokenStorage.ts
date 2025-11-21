const STORAGE_KEY = 'accessToken';

let accessTokenInMemory: string | null = null;

export const tokenStorage = {
  load() {
    accessTokenInMemory = localStorage.getItem(STORAGE_KEY);
  },
  get() {
    return accessTokenInMemory;
  },
  set(accessToken: string) {
    localStorage.setItem(STORAGE_KEY, accessToken);
    accessTokenInMemory = accessToken;
  },
  remove() {
    localStorage.removeItem(STORAGE_KEY);
    accessTokenInMemory = null;
  },
};

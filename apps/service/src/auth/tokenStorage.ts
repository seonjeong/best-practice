const STORAGE_KEY = 'accessToken';

export const tokenStorage = {
  get() {
    return localStorage.getItem(STORAGE_KEY);
  },
  set(accessToken: string) {
    localStorage.setItem(STORAGE_KEY, accessToken);
  },
  remove() {
    localStorage.removeItem(STORAGE_KEY);
  },
};

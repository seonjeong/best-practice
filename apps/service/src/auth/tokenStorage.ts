export const tokenStorage = {
  get() {
    return localStorage.getItem('accessToken');
  },
  set(accessToken: string) {
    localStorage.setItem('accessToken', accessToken);
  },
  delete() {
    localStorage.delete('accessToken');
  },
};

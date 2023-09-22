import { create } from 'zustand';

interface IAuthStore {
  isLoggedIn: boolean;
  loginType: string | null;
  setLoginType: (loginType: string) => void; // eslint-disable-line no-unused-vars
}

const useAuthStore = create<IAuthStore>((set) => ({
  isLoggedIn: !!sessionStorage.getItem('authToken'),
  loginType: sessionStorage.getItem('loginType'),
  setLoginType: (newLoginType) => {
    sessionStorage.setItem('loginType', newLoginType);
    set({ loginType: newLoginType });
  },
}));

export default useAuthStore;

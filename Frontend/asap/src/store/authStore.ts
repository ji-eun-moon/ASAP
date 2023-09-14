import { create } from 'zustand';

interface IAuthStore {
  isLoggedIn: boolean;
  loginType: string | null;
}

const useAuthStore = create<IAuthStore>(() => ({
  isLoggedIn: !!sessionStorage.getItem('authToken'),
  loginType: sessionStorage.getItem('loginType'),
}));

export default useAuthStore;

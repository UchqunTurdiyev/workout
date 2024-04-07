import { create } from 'zustand';

type AuthState = 'login' | 'register';

interface IAuthStore {
	auth: AuthState;
	setAuth: (state: AuthState) => void;
}

export const useAuthState = create<IAuthStore>(set => ({
	auth: 'login',
	setAuth: state => set({ auth: state }),
}));

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const useUserStore = create((set, get) => ({
	user: JSON.parse(localStorage.getItem('userLogged')) || {},
	token: JSON.parse(localStorage.getItem('token')) || ''
}));

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUserStore = create(persist((set, get) => ({
	user: null,
}), {
	name: 'petpal_user',
}));

import { toast } from 'react-toastify';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const useUserStore = create((set, get) => ({
	lostPets: JSON.parse(localStorage.getItem('lostPets')) || [],
	user: JSON.parse(localStorage.getItem('petpal_user')) || {},
	token: JSON.parse(localStorage.getItem('petpal_token')) || '',
	addToLostPets: async (petData) => {
		const lostPets = get().lostPets
		const petExist =  lostPets.find(pet => pet.id == petData.id)
		if(petExist) return null
		set((state) => ({
			lostPets: [...state.lostPets, petData]
		}))
		localStorage.setItem('lostPets', JSON.stringify([...lostPets, petData]))
	},
	removeFromLostPets: async (petData) => {
		const lostPets = get().lostPets
		const petExist =  lostPets.find(pet => pet.id === petData.id)
		if(!petExist) {
			toast.error('La mascota no se encuentra')
			return
		}
		set((state) => ({
			lostPets: state.lostPets.filter(pet => pet.id !== petData.id),
		}))
		const newLostList = get().lostPets
		localStorage.setItem('lostPets', JSON.stringify(newLostList))
	}
}));

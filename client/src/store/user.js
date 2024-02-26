import { toast } from 'react-toastify';
import { create } from 'zustand';

export const useUserStore = create((set, get) => ({
	visible: false,
	lostPets: [],
	user: JSON.parse(localStorage.getItem('petpal_user')) || {},
	token: JSON.parse(localStorage.getItem('petpal_token')) || '',
	handleVisible: () => set((state) => ({visible: !state.visible})),
	getLostPets: async() => {
		const response = await fetch(`${import.meta.env.VITE_API_URL}/pets/lost`)
		const result = await response.json()
		set(() => ({
			lostPets: result
		}))
	},
	addLostPets: async(petData) => {
		const newPetData = {
			...petData, lost: true
		}
		const response = await toast.promise(fetch(`${import.meta.env.VITE_API_URL}/pets/${petData.id}`, {
			method: 'PUT',
			headers: {
				"Content-Type":"application/json",
				Authorization: `Bearer ${JSON.parse(localStorage.getItem('petpal_token'))}`
			},
			body: JSON.stringify(newPetData)
		}), {
			pending: 'Un momento...'
		})
		if(!response.ok) toast.error('Ocurrió un error')
		toast.success('Agregada a la lista de Mascotas Perdidas')
		const result = await response.json()
		return result
	},
	removeLostPets: async (petData) => {
		const newPetData = {
			...petData, lost:false
		}
		const response = await toast.promise(fetch(`${import.meta.env.VITE_API_URL}/pets/${petData.id}`, {
			method: 'PUT',
			headers: {
				"Content-Type":"application/json",
				Authorization: `Bearer ${JSON.parse(localStorage.getItem('petpal_token'))}`
			},
			body: JSON.stringify(newPetData)
		}), {
			pending: 'Un momento...'
		})
		if(!response.ok) toast.error('Ocurió un error')
		toast.success('🥳 Encontrada!!')
		const result = await response.json()
		return result
	},
	notifyOwner: async(petData) => {
		const ownerPhone = petData.owner.telephone
		
	}
}));

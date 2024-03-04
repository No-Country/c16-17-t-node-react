import { toast } from 'react-toastify';
import { create } from 'zustand';
import { authLogin, authRegister, updateUser } from '../services';

export const useUserStore = create((set, get) => ({
	visible: false,
	lostPets: [],
	active: false,
	user: JSON.parse(localStorage.getItem('petpal_user')) || {},
	token: JSON.parse(localStorage.getItem('petpal_token')) || '',
	setActive: () => set((state) =>({active: !state.active})),
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
		if(!response.ok) {
			toast.error('Ocurrió un error')
			return
		}
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
		if(!response.ok) {
			toast.error('Ocurió un error')
			return
		}
		toast.success('🥳 Encontrada!!')
		const result = await response.json()
		return result
	},
	notifyOwner: async(petData) => {
		const ownerPhone = petData.owner.telephone

  },
  login: async (userData) => {
	const { accessToken, ...user } = await authLogin(userData);
	localStorage.setItem('petpal_user', JSON.stringify(user));
	localStorage.setItem('petpal_token', JSON.stringify(accessToken));
	set((state) => ({ user, token: accessToken }));
  },
  registerAndLogin: async (data) => {
    await authRegister(data);
    const login = get().login;
    const { email, password } = data;
    await login({ email, password });
  },
  editUser: async (id, data) => {
    const user = await updateUser(id, data);
    set((state) => ({ user }));
  },
}));

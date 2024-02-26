import { toast } from 'react-toastify';
import { config } from '../config';

// const { apiUrl } = config;
const apiUrl = import.meta.env.VITE_API_URL

export const authRegister = async (e) => {
	e.preventDefault();
	const formData = new FormData(e.target)
	const name = formData.get('name')
	const lastName = formData.get('lastName')
	const password = formData.get('password')
	const email = formData.get('email')
	const data = {
		name,
		lastName,
		email,
		password
	}
	const userRegistration = async (data) => {
		const response = await toast.promise(
			fetch(`${apiUrl}/users`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			}),{
				pending: 'Enviando...'
			}
		) 
		if (!response.ok) {
			toast.error('Error en el Servidor')
			return
		}
		toast.success('Registro exitoso!')
		const user = await response.json();
		location.replace('/login')
		return user;
	}
	userRegistration(data)
};
// export const authRegister = async (data) => {
// 	const response = toast.promise(
// 		await fetch(`${apiUrl}/user`, {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json',
// 			},
// 			body: JSON.stringify(data),
// 		}),{
// 			pending: 'Enviando...'
// 		}
// 	) 
// 	if (!response.ok) {
// 		toast.error('Error en el Servidor')
// 		return
// 	}
// 	toast.success('Registro exitoso!')
// 	const user = await response.json();
// 	return user;
// };

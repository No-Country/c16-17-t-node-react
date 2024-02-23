import { config } from '../config';

const { apiUrl } = config;

export const authRegister = async (data) => {
	const response = await fetch(`${apiUrl}/user`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});
	if (!response.ok) throw new Error('Error en el Servidor');
	const user = await response.json();
	return user;
};

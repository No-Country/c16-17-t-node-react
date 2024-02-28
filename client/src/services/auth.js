import { config } from '../config';

const { apiUrl } = config;

export const authRegister = async (data) => {
  const response = await fetch(`${apiUrl}/users`, {
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

export const authLogin = async (userData) => {
  const response = await fetch(`${apiUrl}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) throw new Error('Usuario o contraseña incorrectos');
  const data = await response.json();
  return data;
};

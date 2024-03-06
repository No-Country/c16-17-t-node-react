import { config } from '../config';

const { apiUrl } = config;

export const updateUser = async (id, data) => {
  const response = await fetch(`${apiUrl}/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('petpal_token'))}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Error en el servidor');
  const userData = await response.json();
  return userData;
};

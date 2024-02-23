import { useState } from 'react';
import { authRegister } from './../services';

export function useAuth() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const register = async (data) => {
		try {
			setLoading(true);
			setError(null);
			await authRegister(data);
		} catch (error) {
			setError(error);
		} finally {
			setLoading(false);
		}
	};

	return {
		loading,
		error,
		register,
	};
}

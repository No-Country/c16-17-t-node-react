const mode = import.meta.env.MODE;

export const config = mode === 'production'
	? {
		apiUrl: import.meta.env.VITE_API_URL,
	}
	: {
		apiUrl: `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}`,
	};

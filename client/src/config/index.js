const mode = import.meta.env.MODE;

export const config = mode === 'production'
	? {
    apiUrl: import.meta.env.VITE_API_URL,
    apiCloudinary: import.meta.env.VITE_APP_CLOUDINARY_API,
	}
	: {
    apiUrl: import.meta.env.VITE_API_URL,
    apiCloudinary: import.meta.env.VITE_APP_CLOUDINARY_API,
	};

/** @type {import('tailwindcss').Config} */

export default {
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			colors: {
				primary: '#E2EFF7',
				secondary: '#FFFFFF',
				danger: '#FE483B',
				success: '#135CFE',
				cancel: '#FFFFFF',
			}
		},
	},
	plugins: [],
};

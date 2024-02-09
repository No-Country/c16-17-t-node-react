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
				bgBtn: '#F88081',
				bgHeader: '#F9FAFD',
				primaryBtn: '#000D83',
				secondaryBtn: '#3EC4FF',
				bgGray: '#F9FAFD',
				secondary: '#FFFFFF',
				danger: '#FE483B',
				success: '#135CFE',
				cancel: '#FFFFFF',
			}
		},
	},
	plugins: [],
};

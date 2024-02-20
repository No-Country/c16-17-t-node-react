module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	settings: {
		react: {
			version: 'detect'
		}
	},
	extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:react/jsx-runtime'],
	overrides: [
		{
			env: {
				node: true,
			},
			files: ['.eslintrc.{js,cjs}'],
			parserOptions: {
				sourceType: 'script',
			},
		},
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['react'],
	rules: {
		indent: ['error', '4'],
		'linebreak-style': ['error', 'windows'],
		quotes: ['error', 'single'],
		semi: ['error', 'always'],
	},
};

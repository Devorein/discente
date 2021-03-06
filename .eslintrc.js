module.exports = {
	env: {
		es2021: true,
		node: true,
	},
	globals: {},
	extends: ['airbnb-base','plugin:import/recommended', 'plugin:import/typescript',  'prettier'],
	parser: '@typescript-eslint/parser',
	ignorePatterns: [
		'dist',
		'examples',
		'experiment',
		'jest.config.js',
		'next.config.js',
		'.eslintrc.js',
    'scripts'
	],
	parserOptions: {
		ecmaVersion: 12,
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint', 'prettier', 'import', 'unused-imports'],
	rules: {
		'no-await-in-loop': 'off',
		'import/prefer-default-export': 'off',
		'no-else-return': 'off',
		'one-var': 'off',
		'no-console': 'off',
		'import/extensions': 'off',
		'no-lonely-if': 'off',
		camelcase: 'off',
    'max-classes-per-file': 'off',
		'import/no-extraneous-dependencies': [
			'error',
			{
				devDependencies: true,
			},
		],
	}
};
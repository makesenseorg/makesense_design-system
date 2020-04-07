module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: ['plugin:vue/strongly-recommended', '@vue/prettier'],
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-useless-escape': 'warn',
		'vue/require-default-prop': 'warn',
		'vue/require-prop-types': 'warn',
	},
	parserOptions: {
		parser: 'babel-eslint'
	}
}

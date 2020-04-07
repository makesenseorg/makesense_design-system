module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: ['plugin:vue/strongly-recommended', '@vue/prettier'],
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-useless-escape': 'off',
		'vue/require-default-prop': 'off',
		'vue/require-prop-types': 'off',
	},
	parserOptions: {
		parser: 'babel-eslint'
	}
}

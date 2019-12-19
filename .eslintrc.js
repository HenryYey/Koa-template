module.exports = {
	"env": {
		"browser": false,
		"es6": true,
		"node": true,
		"commonjs": true
	},
	"extends": "eslint:recommended",
	"globals": {
		"Atomics": "readonly",
		"SharedArrayBuffer": "readonly"
	},
	"parserOptions": {
		"ecmaVersion": 2018,
		"sourceType": "module"
	},
	"rules": {
		"no-undef": 1,
		"no-const-assign": 2,//禁止修改const声明的变量
		"no-process-env": 0,//使用process.env,
		"require-atomic-updates": 0,
		"no-console": 'off',
		"semi": [
			"error",
			"always"
		]
	}
};
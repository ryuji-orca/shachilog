// /** @type {import('@types/eslint').Linter.BaseConfig} */
import { config as defaultConfig } from '@epic-web/config/eslint'
import { fixupConfigRules } from '@eslint/compat'
import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import tailwind from 'eslint-plugin-tailwindcss'
import ts from 'typescript-eslint'

const compat = new FlatCompat()

export default [
	js.configs.recommended,
	...ts.configs.recommended,
	...tailwind.configs['flat/recommended'],
	// ...fixupConfigRules(compat.extends('next/core-web-vitals', 'prettier')),
	...fixupConfigRules(
		compat.extends('plugin:@next/next/recommended', 'prettier'),
	),
	{ ignores: ['.next', 'tailwind.config.mjs'] },
	...defaultConfig,
	// {
	// 	// rules: {
	// 	// 	'no-console': ['error', { allow: ['warn', 'info', 'error'] }],
	// 	// },
	// 	// languageOptions: {
	// 	// 	parserOptions: {
	// 	// 		projectService: {
	// 	// 			maximumDefaultProjectFileMatchCount_THIS_WILL_SLOW_DOWN_LINTING: 20, // 必要に応じて大きな値に変更
	// 	// 		},
	// 	// 	},
	// 	// 	...defaultConfig,
	// 	// },
	// 	// parserOptions: {
	// 	// 	projectService: {
	// 	// 		maximumDefaultProjectFileMatchCount_THIS_WILL_SLOW_DOWN_LINTING: 20, // 必要に応じて大きな値に変更
	// 	// 	},
	// 	// },
	// },
]

import react from '@vitejs/plugin-react'

import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	plugins: [react(), tsconfigPaths()],
	test: {
		environment: 'jsdom',

		include: [
			'src/app/*.test.{ts,tsx}',
			'src/component/*.test.{ts,tsx}',
			'src/component/**/*.test.{ts,tsx}',
			'src/util/*.test.{ts,tsx}',
			'src/util/**/*.test.{ts,tsx}',
		],
		server: {
			deps: {
				inline: ['react-tweet'],
			},
		},
		restoreMocks: true,
		coverage: {
			include: [
				'src/app/*.{ts,tsx}',
				'src/component/*.{ts,tsx}',
				'src/util/*.{ts,tsx}',
			],
			all: true,
		},
	},
})

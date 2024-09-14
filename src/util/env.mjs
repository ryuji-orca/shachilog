import { createEnv } from '@t3-oss/env-nextjs'
import { ZodError, z } from 'zod'

export const env = createEnv({
	server: {
		BLOG_PEPPER: z.string().min(1),
		DATABASE_URL: z.string().min(1),
	},
	// This is the client environment variables
	client: {},
	runtimeEnv: {
		BLOG_PEPPER: process.env.BLOG_PEPPER,
		DATABASE_URL: process.env.DATABASE_URL,
	},
	onInvalidAccess: (error) => {
		throw new Error(
			`❌ Attempted to access a server-side environment variable on the client: ${error}`,
		)
	},
	onValidationError: (error) => {
		console.log(error)
		if (error instanceof ZodError) {
			throw new Error(
				`❌ Invalid environment variables:\n\n${error.errors.map((e, i) => `❌[${i}]: ${e.message}`).join('\n')}\n`,
			)
		}
		throw new Error(
			`❌ Invalid environment variables:\n\n${error.errors.map((e, i) => `❌[${i}]: ${e.message}`).join('\n')}\n`,
		)
	},
	skipValidation: process.env.NODE_ENV === 'production',
})

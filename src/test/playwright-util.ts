import { test as base } from '@playwright/test'
import { type User as UserModel } from '@prisma/client'

import { createUser } from './db-util.ts'
import prisma from '@/util/db.ts'

export * from './db-util.ts'

type GetOrInsertUserOptions = {
	id?: string
	ipAddresses?: UserModel['ipAddresses']
	role?: UserModel['role']
}

type User = {
	id: string
	ipAddresses: string | null
	role: string
}

export const getOrInsertUser = async ({
	id,
	ipAddresses,
	role,
}: GetOrInsertUserOptions = {}): Promise<User> => {
	const select = { id: true, ipAddresses: true, role: true }

	if (id) {
		return await prisma.user.findUniqueOrThrow({
			select,
			where: { id },
		})
	} else {
		const { ipAddresses: userIpAddress } = createUser()
		ipAddresses ??= userIpAddress

		return await prisma.user.create({
			select,
			data: {
				ipAddresses,
				role: role ?? 'MEMBER',
			},
		})
	}
}

export const test = base.extend<{
	insertNewUser(options?: GetOrInsertUserOptions): Promise<User>
}>({
	// eslint-disable-next-line no-empty-pattern
	insertNewUser: async ({}, use) => {
		let userId: string | undefined = undefined
		// eslint-disable-next-line react-hooks/rules-of-hooks
		await use(async (options) => {
			const user = await getOrInsertUser(options)
			userId = user.id
			return user
		})
		await prisma.user.deleteMany({ where: { id: userId } })
	},
})
export const { expect } = test

export const waitFor = async <ReturnValue>(
	cb: () => ReturnValue | Promise<ReturnValue>,
	{
		errorMessage,
		timeout = 5000,
	}: { errorMessage?: string; timeout?: number } = {},
) => {
	const endTime = Date.now() + timeout
	let lastError: unknown = new Error(errorMessage)
	while (Date.now() < endTime) {
		try {
			const response = await cb()
			if (response) return response
		} catch (e: unknown) {
			lastError = e
		}
		await new Promise((r) => setTimeout(r, 100))
	}
	throw lastError
}

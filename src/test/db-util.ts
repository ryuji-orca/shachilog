import { createHash } from 'node:crypto'
import { env } from 'node:process'
import { faker } from '@faker-js/faker'
import { UniqueEnforcer } from 'enforce-unique'

const uniqueIpEnforcer = new UniqueEnforcer()

const createUser = () => {
	const ipAddress = faker.internet.ip()
	const ipAddressWithPepper = ipAddress + env.BLOG_PEPPER

	const mockHashedIpAddress = createHash('sha256')
		.update(ipAddressWithPepper)
		.digest('hex')

	const userIpAddress = uniqueIpEnforcer.enforce(() => mockHashedIpAddress)

	return {
		ipAddresses: userIpAddress,
	}
}

const LOCAL_IP_ADDRESS = '::1'
const createLocalUser = async () => {
	const ipAddress = LOCAL_IP_ADDRESS.split(',')[0]?.trim() ?? ''

	const ipAddressWithPepper = ipAddress + env.BLOG_PEPPER

	const mockHashedIpAddress = createHash('sha256')
		.update(ipAddressWithPepper)
		.digest('hex')

	const userIpAddress = uniqueIpEnforcer.enforce(() => mockHashedIpAddress)

	return {
		ipAddresses: userIpAddress,
	}
}

export { createUser, createLocalUser, uniqueIpEnforcer }

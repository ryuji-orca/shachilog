'use server'

import { createHash } from 'crypto'
import { headers } from 'next/headers'
import { env } from './env.mjs'

const getHashedIp = () => {
	const forwardFor = headers().get('x-forwarded-for')
	const realIp = headers().get('x-real-ip')

	if (forwardFor) {
		const ipAddress = forwardFor.split(',')[0]?.trim() ?? ''
		const ipAddressWithPepper = ipAddress + env.BLOG_PEPPER

		return createHash('sha256').update(ipAddressWithPepper).digest('hex')
	}

	if (realIp) {
		const ipAddressWithPepper = realIp + process.env.BLOG_PEPPER
		return createHash('sha256').update(ipAddressWithPepper).digest('hex')
	}

	return '123.456.789'
}

export { getHashedIp }

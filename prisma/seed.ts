import prisma from '@/util/db'

const main = async () => {
	const ryuji = await prisma.user.upsert({
		where: {
			id: '',
			ipAddresses:
				'c1c087e90561f6ba6640be67c61f194e6cfcaff44992750d8834d24c6f49a0c9',
		},
		update: {},
		create: {
			ipAddresses:
				'c1c087e90561f6ba6640be67c61f194e6cfcaff44992750d8834d24c6f49a0c9',
			role: 'ADMIN',
		},
	})

	await prisma.postLike.create({
		data: {
			postSlug: 'nft-allowlist-smart-contract',
			userId: ryuji.id,
			likesByUser: ryuji.ipAddresses ?? '',
			count: 1,
		},
	})
}

main()
	.catch((e) => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})

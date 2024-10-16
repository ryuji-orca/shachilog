import { faker } from '@faker-js/faker'

import {
	test as base,
	createLocalUser,
	waitFor,
	uniqueIpEnforcer,
} from '../playwright-util'
import prisma from '@/util/db'
import { getBlogPosts } from '@/util/mdx-server'

const test = base.extend<{
	getLocalUserData(): Promise<{
		id: string
		ipAddresses: string | null
		role: string
	}>
}>({
	// eslint-disable-next-line no-empty-pattern
	getLocalUserData: async ({}, use) => {
		const hashIp = (await createLocalUser()).ipAddresses

		// eslint-disable-next-line react-hooks/rules-of-hooks
		await use(async () => {
			const localUserData = {
				id: faker.string.uuid(),
				role: 'MEMBER',
				ipAddresses: hashIp,
			}
			return localUserData
		})

		await prisma.user.deleteMany({
			where: { ipAddresses: hashIp },
		})
	},
})
const { expect } = test

test.beforeEach(() => {
	uniqueIpEnforcer.reset()
})

test('ブログの記事のいいねボタンを押したらipAddressを元にユーザーが作成されカウントが増えること', async ({
	page,
	getLocalUserData,
}) => {
	await page.goto('/blog')

	const postTitle = getBlogPosts()[0]?.metadata.title
	const post = page.getByRole('link', { name: postTitle })
	await post.click()

	const postSlug = getBlogPosts()[0]?.slug
	await expect(page).toHaveURL(`blog/${postSlug}`)

	const likeButton = page.getByLabel(/like button/i)
	await likeButton.click()

	await waitFor(
		async () => {
			// dbリセット
			await getLocalUserData()
			const likeCount = Number(
				await page.getByTestId('like-count').textContent(),
			)

			return likeCount === 1
		},
		{ timeout: 10000, errorMessage: 'likeCount is not 1' },
	)

	const likeCount = Number(await page.getByTestId('like-count').textContent())

	expect(likeCount).toBe(1)
})

test('５回以上いいねを押せないこと', async ({ page, getLocalUserData }) => {
	await page.goto('/blog')

	const postTitle = getBlogPosts()[0]?.metadata.title
	const post = page.getByRole('link', { name: postTitle })
	await post.click()

	const postSlug = getBlogPosts()[0]?.slug
	await expect(page).toHaveURL(`blog/${postSlug}`)

	const likeButton = page.getByLabel(/like button/i)

	// 5回いいねを押す
	for (let i = 0; i < 5; i++) {
		await likeButton.click()
	}

	await waitFor(
		async () => {
			await getLocalUserData()
			const likeCount = Number(
				await page.getByTestId('like-count').textContent(),
			)

			return likeCount === 5
		},
		{ errorMessage: 'likeCount is not a 5' },
	)

	await expect(likeButton).toBeDisabled()
})

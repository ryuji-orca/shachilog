import { test, expect } from '@playwright/test'
import { waitFor } from '../playwright-util'
import { getAboutPosts, getBlogPosts } from '@/util/mdx-server'

test('トップページからblogをクリックしたら正しく遷移し記事が閲覧できること', async ({
	page,
}) => {
	await page.goto('/')

	const blogLink = page.getByRole('link', { name: /blog/i })

	await blogLink.click()

	await expect(page).toHaveURL('blog')

	const blogPosts = getBlogPosts()

	for (const post of blogPosts) {
		const postLink = page.getByRole('link', { name: post.metadata.title })
		await postLink.click()

		await waitFor(
			async () => {
				// dbリセット
				const postTitle = await page.locator('h1').textContent()

				return postTitle === post.metadata.title
			},
			{ timeout: 10000 },
		)

		await expect(page).toHaveURL(`blog/${post.slug}`)

		await expect(
			page.getByRole('heading', { name: post.metadata.title }),
		).toBeVisible()

		await page.goBack()
	}
})

const ABOUT_LOCATOR = 'a[href="/about/'
const BLOG_LOCATOR = 'a[href="/blog/'

test('トップページからaboutをクリックしたら正しく遷移すること', async ({
	page,
}) => {
	await page.goto('/')

	const aboutLink = page.getByRole('link', { name: /about/i })

	await aboutLink.click()

	await expect(page).toHaveURL('about')

	const aboutPosts = getAboutPosts()

	for (const post of aboutPosts) {
		const postLink = page.locator(ABOUT_LOCATOR + post.slug + '"]')

		await postLink.click()

		await waitFor(
			async () => {
				// dbリセット
				const postTitle = await page.locator('h1').textContent()

				return postTitle === post.metadata.title
			},
			{ timeout: 10000 },
		)

		await expect(page).toHaveURL(`about/${post.slug}`)

		await expect(
			page.getByRole('heading', { name: post.metadata.title }),
		).toBeVisible()

		await page.goBack()
	}
})

test('PCの時にトップページではヘッダーナビのリンクは表示されないがそれ以外のページでは表示されること', async ({
	page,
}) => {
	await page.goto('/')

	await expect(page.locator('header').getByRole('list')).not.toBeVisible()

	await page.goto('/about')

	await expect(page.locator('header').getByRole('list')).toBeVisible()

	const firstAboutPostSlug = getAboutPosts()[0]?.slug
	const aboutPostLink = page.locator(ABOUT_LOCATOR + firstAboutPostSlug + '"]')

	await aboutPostLink.click()

	await expect(page.locator('header').getByRole('list')).toBeVisible()

	await page.goto('/blog')

	await expect(page.locator('header').getByRole('list')).toBeVisible()

	const firstBlogPostSlug = getBlogPosts()[0]?.slug
	const blogPostLink = page.locator(BLOG_LOCATOR + firstBlogPostSlug + '"]')

	await blogPostLink.click()

	await expect(page.locator('header').getByRole('list')).toBeVisible()

	await page.goto('/')

	await expect(page.locator('header').getByRole('list')).not.toBeVisible()
})

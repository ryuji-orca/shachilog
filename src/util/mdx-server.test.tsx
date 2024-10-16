import { expect, test } from 'vitest'

import { getBlogPosts } from './mdx-server'

test('getBlogPostsで日付順に記事を取得できていること', () => {
	const posts = getBlogPosts()

	const sortedPosts = [...posts].sort((a, b) => {
		if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
			return -1
		}
		return 1
	})

	expect(posts).toEqual(sortedPosts)
})

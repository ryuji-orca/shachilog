import { getBlogPosts } from './mdx-server'

const getBlogMdxListItem = (slug: string) => {
	const allBlogs = getBlogPosts()
	const post = allBlogs.find((post) => {
		return post.slug === slug
	})

	return post ?? null
}

const getBlogMdxListItems = () => {
	const allBlogs = getBlogPosts()
	return allBlogs.sort((a, b) => {
		if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
			return -1
		}
		return 1
	})
}

export { getBlogMdxListItem, getBlogMdxListItems }

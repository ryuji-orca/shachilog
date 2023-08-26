import { allBlogs } from "contentlayer/generated"

const getBlogMdxListItem = (slug: string) => {
  const post = allBlogs.find(post => {
    return post.slug === slug
  })

  return post ?? null
}

const getBlogMdxListItems = () => {
  return allBlogs.sort((a, b) => {
    if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
      return -1
    }
    return 1
  })
}

export { getBlogMdxListItem, getBlogMdxListItems }

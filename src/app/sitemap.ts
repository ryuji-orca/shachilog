import { allBlogs } from "contentlayer/generated"

export default async function sitemap() {
  const blogs = allBlogs.map(post => {
    return {
      url: `https:///${post.slug}`,
      lastModified: post.publishedAt,
    }
  })

  const routes = ["", "/about", "/blog"].map(route => {
    return {
      url: `https://${route}`,
      lastModified: new Date().toISOString().split("T")[0],
    }
  })

  return [...routes, ...blogs]
}

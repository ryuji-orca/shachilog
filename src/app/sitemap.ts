import type { MetadataRoute } from "next"

import { allBlogs } from "contentlayer/generated"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogs = allBlogs.map(post => {
    return {
      url: `https://shachilog.xyz/blog/${post.slug}`,
      lastModified: post.publishedAt,
    }
  })

  const routes = ["", "/about", "/blog"].map(route => {
    return {
      url: `https://shachilog.xyz${route}`,
      lastModified: new Date().toISOString().split("T")[0],
    }
  })

  return [...routes, ...blogs]
}

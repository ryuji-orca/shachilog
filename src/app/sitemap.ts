import  { type MetadataRoute } from "next"

import { getBlogPosts } from "@/util/mdx-server"

export default function sitemap(): MetadataRoute.Sitemap {
  const blogs = getBlogPosts()?.map(post => {
    return {
      url: `https://shachilog.xyz/blog/${post.slug}`,
      lastModified: post.metadata.publishedAt,
    }
  })

  const routes: MetadataRoute.Sitemap = ["", "/about", "/blog"].map(route => {
    return {
      url: `https://shachilog.xyz${route}`,
      lastModified: new Date().toISOString().split("T")[0],
    }
  })

  return [...routes, ...blogs]
}

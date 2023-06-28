import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
      },
    ],
    sitemap: "https://shachilog.xyz/sitemap.xml",
    host: "https://shachilog.xyz",
  }
}

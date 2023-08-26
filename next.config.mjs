import { withContentlayer } from "next-contentlayer"

/** @type {import('next').NextConfig} */
// const {withContentlayer} = require('next-contentlayer')

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: "./src",
  experimental: {
    appDir: true,
    serverActions: true,
    // mdxRs: true,
    serverComponentsExternalPackages: [
      "@tremor/react",
      "react-tweet-embed",
      "react-archer",
      "@radix-ui/react-popover",
    ],
  },
}

export default withContentlayer(nextConfig)

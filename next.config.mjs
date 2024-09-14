/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    dirs: ["src"],
  },
  experimental: {
    // serverComponentsExternalPackages: [
    //   // "@tremor/react",
    //   // "react-tweet-embed",
    //   // "react-archer",
    //   // "@radix-ui/react-popover",
    // ],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  transpilePackages: [
    "next-mdx-remote",
    "@tremor/react",
    "react-archer",
    "@radix-ui/react-popover",
  ],
}

export default nextConfig

import "./globals.css"

import type { Metadata } from "next"
import { Inter } from "next/font/google"

import { Providers } from "@/app/providers"

const inter = Inter({
  display: "swap",
  weight: "variable",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: "shachilog",
    template: "%s | shachilog",
  },
  description:
    "ryujiの個人ブログです。ブロックチェーンやフロントエンドに関して学んだことを発信するブログです",
  creator: "ryuji",
  authors: [
    {
      name: "ryuji",
      url: "https://www.shachilog.xyz",
    },
  ],

  openGraph: {
    title: "shachilog",
    description:
      "ryujiの個人ブログです。ブロックチェーンやフロントエンドに関して学んだことを発信するブログです",
    url: "https://www.shachilog.xyz",
    siteName: "shachilog",
    images: [
      {
        url: "https://www.shachilog.xyz/image/common/og-default.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "ja-JP",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "shachilog",
    // description:
    //   "ryujiの個人ブログです。ブロックチェーンやフロントエンドに関して学んだことを発信するブログです",
    card: "summary_large_image",
  },
  icons: {
    shortcut: "/favicon.ico",
  },
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={`${inter.className}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

export default RootLayout

import "./globals.css"
import "@radix-ui/themes/styles.css"

import type { Metadata } from "next"
import { Inter } from "next/font/google"

import { Toaster } from "@/component/ui/toaster"
import { Analytics } from "@vercel/analytics/react"

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
    "ryujiの個人ブログです。ブロックチェーンやフロントエンドに関して学んだことを発信します。",
  creator: "ryuji",
  authors: [
    {
      name: "ryuji",
      url: "https://shachilog.xyz",
    },
  ],

  openGraph: {
    title: "shachilog",
    description:
      "ryujiの個人ブログです。ブロックチェーンやフロントエンドに関して学んだことを発信します。",
    url: "https://shachilog.xyz",
    siteName: "shachilog",
    images: [
      {
        url: "https://shachilog.xyz/image/common/og-default.png",
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
    card: "summary_large_image",
  },
  // icons: {
  //   shortcut: "/favicon.ico",
  // },
  verification: {
    google: "ZXOngkLZnBjLXJ38lCN1elG8V632hb4NGzTxUOyFtOQ",
  },
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={`${inter.className}`}>
        <Providers>
          {children}
          <Analytics />
          <Toaster />
          {/* <ThemePanel /> */}
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout

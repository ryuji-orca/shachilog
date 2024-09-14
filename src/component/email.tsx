"use client"

import { Box, Card, Heading, Text } from "@radix-ui/themes"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/util/cn"

export const EmailSimpleForm = () => {
  const pathname = usePathname()

  if (pathname !== "/" && !pathname.startsWith("/blog/")) {
    return null
  }
  return (
    <Box
      className={cn("", {
        "!mt-24 px-6 max-w-[850px] !mx-auto w-full": pathname === "/",
        "bg-indigo-4 dark:bg-indigoa-4 py-16": pathname !== "/",
      })}
    >
      <Card
        size="4"
        variant={pathname === "/" ? "surface" : "ghost"}
        className={cn("", {
          "max-w-[788px] !mx-auto w-full": pathname !== "/",
        })}
      >
        <Heading as="h2" mb="6">
          無料メルマガ
        </Heading>
        <Text as="p" mb="5" className="!leading-7 !tracking-wider">
          このサイトの目的は、NFTのエンジニアの方やブロックチェーンの技術に興味がある方に、役に立つコンテンツを作ることです。
          新しいコンテンツが公開されたらお知らせします。
        </Text>
        <Text as="p" mb="5" className="!leading-7 !tracking-wider">
          また、時々メルマガ限定のコンテンツも配信します。
        </Text>
        <Text as="p" mb="5" className="!leading-7 !tracking-wider">
          不満足ならいつでも解約できます。
        </Text>
        <Box>
          <Text className="!leading-7 !tracking-wider">
            無料登録は 「
            <Link
              href="https://shachilog.substack.com/?showWelcome=true"
              target="_blank"
              className="text-blue-11 decoration-blue-10 underline-offset-2 hover:underline dark:text-bluedark-11 dark:decoration-bluedark-10"
            >
              こちら
            </Link>
            」 です。
          </Text>
        </Box>
      </Card>
    </Box>
  )
}

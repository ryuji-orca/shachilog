import { Button, Card, Inset } from "@radix-ui/themes"
import Image from "next/image"
import Link from "next/link"

import { IconCircle } from "@/component/motion-circle"
import { shimmer, toBase64 } from "@/util/shimmer"

export const metadata = {
  title: "About",
  description: "自己紹介ページ",
}

const LatestWorkList = [
  {
    title: "TheMafiaAnimals Soldiers",
    description:
      "TheMafiaAnimals Soldiersのフロントエンドの開発を担当しました。",
    image: "/image/about/tmas-work.webp",
    detailLink: "/about/tmas",
  },
  {
    title: "Aopanda Partyのコントラクトの監査を担当",
    description: "Aopanda Partyのスマートコントラクトの監査を担当しました。",
    image: "/image/about/app-work.webp",
    detailLink: "/about/app",
  },
  {
    title: "ZUTTO MAMORU",
    description:
      "ZUTTO MAMORU（ずとまも）のスマートコントラクトとフロントエンドの開発を担当しました。",
    image: "/image/about/zutto-mamoru-work.webp",
    detailLink: "/about/zutto-mamoru",
  },
  {
    title: "CryptoNinja Partners Rookies",
    description:
      "CNPRのフロントエンド、スマートコントラクト、バックエンドの開発を担当しました。",
    image: "/image/about/cnpr-work.webp",
    detailLink: "/about/cnpr",
  },
] as const

const About = () => {
  return (
    <div className="prose prose-slate max-w-full  pt-16 prose-headings:text-indigo-11  prose-h2:font-bold prose-p:tracking-wider prose-a:text-blue-11 prose-a:no-underline hover:prose-a:underline dark:text-slatedark-12 dark:prose-headings:text-yellowdark-11 dark:prose-a:text-bluedark-11 md:pt-24">
      <section className="max-w-1096 mx-auto px-6">
        <div className="relative size-[64px]">
          <div className="absolute left-[-8px] top-[-8px] size-[80px]">
            <IconCircle />
          </div>

          <Image
            className="rounded-full"
            width={64}
            height={64}
            src="/image/about/ryuji-icon.webp"
            alt="ryujiのアイコン"
            placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(802, 535))}`}
          />
        </div>

        <h1 className="my-8 text-3xl text-slate-12 dark:text-slatedark-12">
          Block Chain Engineer
        </h1>

        <p>こんにちは、Ryujiです。</p>
        <p>
          元々Web制作の仕事をメインでしていましたが、現在はブロックチェーンエンジニアとして活動しています。
          Solidityを独学で学んだ後に、日本のNFTプロジェクトに参加し、スマートコントラクトの開発を学びました。
          フロントエンドの開発経験もあるので、ユーザーが使いやすいサイトを作るのが得意で、バックエンドからフロントエンドの開発まで幅広く担当することができます。
        </p>

        <p>
          現在は、ブロックチェーンの企業でフリーランスとして働きつつ、個人開発をしています。
        </p>
      </section>

      <div className="relative h-32 sm:h-48">
        <div className="absolute left-0 top-0 h-3/4 w-full bg-[linear-gradient(rgba(230,244,254,0)_0%,rgba(230,244,254,0.75)_100%)] dark:bg-[linear-gradient(rgba(255,255,255,0)_0%,rgba(255,255,255,0.15)_100%)]"></div>
        <svg
          className="absolute -bottom-1 left-0 h-20 w-full sm:h-36"
          style={{ width: "100%" }}
          viewBox="0 0 3811 866"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0 408.997L212 294.997C423 179.997 847 -48.0033 1270 8.99667C1694 65.9967 2117 408.997 2541 465.997C2964 522.997 3388 294.997 3599 179.997L3811 65.9967V865.997H3599C3388 865.997 2964 865.997 2541 865.997C2117 865.997 1694 865.997 1270 865.997C847 865.997 423 865.997 212 865.997H0V408.997Z"
            className="fill-indigo-1 dark:fill-indigodark-1"
          />
        </svg>
      </div>

      <section className="bg-indigo-1 dark:bg-indigodark-1">
        <div className="max-w-1096 mx-auto px-6">
          <h2 className="mt-0">Latest Work</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {LatestWorkList.map(({ title, description, detailLink, image }) => {
              return (
                <Card size="3" key={title}>
                  <Inset
                    clip="padding-box"
                    side="top"
                    pb="current"
                    className="not-prose relative"
                  >
                    <Image
                      className="h-auto w-full max-w-full object-cover"
                      width={802}
                      height={535}
                      sizes="100vw"
                      src={image}
                      alt={title}
                      priority
                      placeholder={`data:image/svg+xml;base64,${toBase64(
                        shimmer(802, 535),
                      )}`}
                    />
                  </Inset>
                  <h3 className="mt-3">{title}</h3>
                  <p>{description}</p>
                  <div className="flex justify-center">
                    <Button
                      asChild
                      className="not-prose"
                      variant="soft"
                      size="2"
                    >
                      <Link href={detailLink}>詳細を見る</Link>
                    </Button>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* <h2>過去の活動</h2>

        <h3>むなかたさんと対談</h3>
        <div className="not-prose ">
          <Tweet id="1690709829214756864" />
        </div>
        <p>忍者DAOで有名なエンジニアのむなかたさんと対談いたしました。</p> */}
      {/* <h3>manabuさんのブログに追記</h3>
        <div className="not-prose ">
          <Tweet id="1635962183053119488" />
        </div>
        <p>
          <a href="https://mblog.com/buy-nfts" target="_blank">
            メルマガ企画：複数のNFTを購入して、ブログから継続して応援します
          </a>
          の記事に追記していただきました。
        </p>
        <p>僕がエンジニアになったのはマナブさんがきっかけです。</p>
        <p>
          特に実績ではありませんが、嬉しかったので掲載させていただきます🙏。
        </p> */}
    </div>
  )
}

export default About

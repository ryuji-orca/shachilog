import Image from "next/image"
import Link from "next/link"

import { shimmer, toBase64 } from "@/util/shimmer"
import { Button, Card, Inset } from "@radix-ui/themes"
import { Tweet } from "react-tweet"

export const metadata = {
  title: "About",
  description: "自己紹介ページ",
}

const About = () => {
  return (
    <section className="px-6 pt-16 md:pt-24">
      <h1 className="pb-6 text-3xl text-slate-12 dark:text-slatedark-12">
        About
      </h1>
      <div className="prose prose-slate max-w-full  prose-headings:text-indigo-11 prose-h2:font-bold prose-p:tracking-wider prose-a:text-blue-11 prose-a:no-underline hover:prose-a:underline dark:text-slatedark-12 dark:prose-headings:text-yellowdark-11 dark:prose-a:text-bluedark-11">
        <p>
          こんにちは、Ryujiです。
          <br />
          フロントエンドの開発を得意とするブロックチェーンエンジニアです。
        </p>
        <p>
          以前は、Web制作の仕事をしていましたが、僕が参入した時にはすでに市場が形成されていて、自分がここで頑張る意味を見出せず、仕事をしているうちに将来伸びると期待されている分野で、働きたいと考えるようになりました。
          その時にちょうど、日本でNFTが盛り上がり、ゲームとも相性が良いと聞き、Solidityを独学で勉強し、日本のNFTプロジェクトにブロックチェーンエンジニアとして参加しました。
        </p>

        <p>現在は、ブロックチェーンの企業でフリーランスとして働いています。</p>
        <h2>制作物</h2>
        <Card size="3" className="mb-8">
          <Inset
            clip="padding-box"
            side="top"
            pb="current"
            className="not-prose relative"
          >
            <Image
              className="h-auto w-full max-w-full object-contain"
              width={802}
              height={535}
              sizes="100vw"
              src="/image/about/tmas-top.webp"
              alt="tmasのステーキング画像"
              priority
              placeholder={`data:image/svg+xml;base64,${toBase64(
                shimmer(802, 535),
              )}`}
            />
          </Inset>
          <h3 className="mt-3">TheMafiaAnimals Soldiers</h3>

          <p>
            <a
              href="https://opensea.io/collection/the-mafia-animals-soldiers-"
              target="_blank"
            >
              TheMafiaAnimals Soldiers
            </a>
            のフロントエンドを開発しました。
          </p>
          <div className="flex justify-center">
            <Button asChild className="not-prose" variant="soft" size="2">
              <Link href={"/about/tmas"} className="">
                詳細を見る
              </Link>
            </Button>
          </div>
        </Card>

        <Card size="3">
          <Inset
            clip="padding-box"
            side="top"
            pb="current"
            className="not-prose relative"
          >
            <Image
              className="h-auto w-full max-w-full object-contain"
              width={802}
              height={535}
              sizes="100vw"
              src="/image/about/zutto-mamoru.jpg"
              alt="ZUTTO MAMORUのトップ画像"
              priority
              placeholder={`data:image/svg+xml;base64,${toBase64(
                shimmer(802, 535),
              )}`}
            />
          </Inset>
          <h3 className="mt-3">ZUTTO MAMORU</h3>

          <p>
            <a
              href="https://opensea.io/collection/the-mafia-animals-soldiers-"
              target="_blank"
            >
              ZUTTO MAMORU（ずとまも）
            </a>
            のスマートコントラクトとフロントエンドの開発を担当しました。
          </p>
          <div className="flex justify-center">
            <Button asChild className="not-prose" variant="soft" size="2">
              <Link href={"/about/zutto-mamoru"}>詳細を見る</Link>
            </Button>
          </div>
        </Card>

        <h2>過去の活動</h2>
        <h3>APPの監査担当</h3>
        <div className="not-prose">
          <Tweet id="1585474800398479360" />
        </div>
        <p>
          <a href="https://nft.aopanda.ainy-llc.com/site/" target="_blank">
            Aopanda Party
          </a>
          の監査をさせていただきました
        </p>
        <p>
          また、盗難防止の機能の
          <a href="https://youtu.be/-T3ACrclZGo?feature=shared" target="_blank">
            ぱんだロック
          </a>
          にCNPRで使ったオフチェーン署名が採用されました。
        </p>

        <div className="not-prose">
          <Tweet id="1583638765985501184" />
        </div>
        <h3>むなかたさんと対談</h3>
        <div className="not-prose ">
          <Tweet id="1690709829214756864" />
        </div>
        <p>忍者DAOで有名なエンジニアのむなかたさんと対談いたしました。</p>
        <h3>manabuさんのブログに追記</h3>
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
        </p>
      </div>
    </section>
  )
}

export default About

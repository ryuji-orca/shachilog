import Image from "next/image"

import { Tweet } from "react-tweet"

export const metadata = {
  title: "About",
  description: "自己紹介ページ",
}

const About = () => {
  return (
    <section className="px-6 py-16 md:py-24">
      <h1 className="pb-6 text-3xl text-slate-12 dark:text-slatedark-12">
        About
      </h1>
      <div className="prose prose-slate max-w-full  prose-headings:text-indigo-11 prose-h2:font-bold prose-p:tracking-wider prose-a:text-blue-11 prose-a:no-underline hover:prose-a:underline dark:text-slatedark-12 dark:prose-headings:text-yellowdark-11 dark:prose-a:text-bluedark-11">
        <p>
          2022年までWeb制作の仕事を主にしていましたが、最近はブロックチェーンエンジニアになりたいと思い色々活動中です。
        </p>
        <h2>過去の活動</h2>
        <h3>TheMafiaAnimals Soldiers</h3>
        <div className="not-prose relative">
          <Image
            className="h-auto w-full object-contain"
            width="0"
            height="0"
            sizes="100vw"
            src="/image/about/tmas-staking.jpg"
            alt="tmasのトップ画像"
            priority
          />
        </div>
        <p>
          <a href="https://twitter.com/RiBOX15" target="_blank">
            TheMafiaAnimals Soldiers
          </a>
          のステーキングページやポイント使用画面などのフロントエンドを担当しました。
        </p>
        <p>
          今後もサイトのアプデとオフチェーンゲームのフロントも開発もする予定です。
        </p>
        <p className="pb-6">サイトはdiscordに掲載されています。</p>
        <h3>ZUTTO MAMORU</h3>
        <div className="not-prose relative">
          <Image
            className="h-auto w-full object-contain"
            width="0"
            height="0"
            sizes="100vw"
            src="/image/about/zutto-mamoru.jpg"
            alt="ZUTTO MAMORUのトップ画像"
          />
        </div>
        <p>
          <a href="https://twitter.com/zutomamo" target="_blank">
            ZUTTO MAMORU
          </a>
          のSolidityとフロントエンドの開発の両方を担当しました。
        </p>
        <p>実装した主なギミックは下記の通りです。</p>
        <ul>
          <li>時間経過と特定の条件でメタデータが変わる</li>
          <li>
            本体のNFTが移動したら紐付いているSBTも一緒に移動する(ERC5192PLの開発)
          </li>
          <li>メタデータリフレッシュ(ERC-4906)</li>
        </ul>
        <p>Solidityのコードはこちらから見れます。</p>
        <ul>
          <li>
            <a
              href="https://etherscan.io/address/0xa33C3162BD3AE64e81DbC88765B6f719C90c5B28#code"
              target="_blank"
            >
              本体
            </a>
          </li>
          <li>
            <a
              href="https://etherscan.io/address/0xCF01626065609c102c6a8DD02F2b1220258E6987#code"
              target="_blank"
            >
              セール
            </a>
          </li>
          <li>
            <a
              href="https://etherscan.io/address/0x56a8e87911E82c62cE1439a6b4C710527aDe41D0#code"
              target="_blank"
            >
              メタデータ
            </a>
          </li>
          <li>
            <a
              href="https://etherscan.io/address/0x89570b38Cf8015aA5010d63829DB64467c2E040d#code"
              target="_blank"
            >
              SBTのファクトリー
            </a>
          </li>
          <li>
            <a
              href="https://etherscan.io/address/0x95b9cf49deaa519D6CAd94224313bfFBc3F34241#code"
              target="_blank"
            >
              SBTのセール
            </a>
          </li>
        </ul>
        <p>NFTプロジェクトとしては結構複雑な方だと思います。</p>
        <h3>CNPR</h3>
        <div className="not-prose relative">
          <Image
            className="h-auto w-full object-contain"
            width="0"
            height="0"
            sizes="100vw"
            src="/image/about/cnpr.jpg"
            alt="CNPRのトップ画像"
          />
        </div>
        <p>
          <a href="https://twitter.com/CNP_Rookies" target="_blank">
            CNPR
          </a>
          のSolidityとフロントエンドの開発の両方を担当しました。
        </p>
        <p>僕が初めて開発に参加したNFTプロジェクトです。</p>
        <p>Solidityのコードはこちらから見れます。</p>
        <ul>
          <li>
            <a
              href="https://etherscan.io/address/0x836b4d9c0f01275a28085acef53ac30460f58242#code"
              target="_blank"
            >
              本体
            </a>
          </li>
          <li>
            <a
              href="https://polygonscan.com/address/0x836b4d9c0f01275a28085acef53ac30460f58242#code"
              target="_blank"
            >
              SBT
            </a>
          </li>
        </ul>
        <h3>APPの監査担当</h3>
        <div className="not-prose ">
          <Tweet id="1585474800398479360" />
        </div>
        <p>
          <a href="https://nft.aopanda.ainy-llc.com/site/" target="_blank">
            Aopanda Party
          </a>
          の監査をさせていただきました
        </p>
        <p>
          ぱんだロックにCNPRで使ったオフチェーン署名を使いたいとのことで連絡いただきました。
        </p>
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
        <p>特に実績ではありませんが、嬉しかったので掲載させていただきます🙏</p>
        <p>
          フロントエンドやブロックチェーンを活用したアプリ開発をしたいなどのお仕事依頼がありましたら
          <a href="https://twitter.com/orca48691" target="_blank">
            Twitter
          </a>
          のDMか
          <a href="mailto:ryuji48691771@gmail.com" target="_blank">
            メール
          </a>
          でご連絡お願いします！
        </p>
      </div>
    </section>
  )
}

export default About

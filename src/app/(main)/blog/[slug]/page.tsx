import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { MdxComponent } from "@/component/mdx/mdx-component"
import { Toc } from "@/component/toc"
import { TocFullPage } from "@/component/toc-full-page"
import { cn } from "@/util/cn"
import { getBlogMdxListItem } from "@/util/mdx-hook"
import { allBlogs } from "contentlayer/generated"

export const generateStaticParams = async () => {
  return allBlogs.map(post => {
    return {
      slug: post.slug,
    }
  })
}

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata | undefined> => {
  const post = getBlogMdxListItem(params.slug)

  if (!post) {
    return notFound()
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
    slug,
  } = post

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `https://shachilog.xyz/blog/${slug}`,
      images: [
        {
          url: `https://shachilog.xyz${image}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`https://shachilog.xyz${image}`],
    },
  }
}

const Page = ({ params }: { params: { slug: string } }) => {
  const post = getBlogMdxListItem(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <section className="!col-[1/6] overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(post.structuredData),
        }}
      />

      {post?.layout === "full" ? <TocFullPage /> : null}

      <div className="max-w-1096 mx-auto px-6 text-center">
        <h1 className="text-balance pb-6 pt-16 text-2xl font-bold leading-normal tracking-wider text-slate-12 dark:text-slatedark-12 sm:text-3xl">
          {post.title}
        </h1>
        <div className="text-slate-11 dark:text-slatedark-11">
          {post.publishedAt}
        </div>
      </div>
      <div className="max-w-1096 mx-auto mt-12 flex flex-row-reverse justify-center gap-6 border-t border-indigo-6 p-6 dark:border-indigodark-6 lg:justify-between">
        {post?.layout === "blog" ? (
          <aside className="sticky top-32 mt-6 hidden max-h-[calc(100vh_-_148px)] max-w-[264px] overflow-auto scrollbar scrollbar-track-indigo-1 scrollbar-thumb-slate-8 scrollbar-thumb-rounded scrollbar-w-[4px] prose-ol:list-none dark:scrollbar-track-indigodark-1 dark:scrollbar-thumb-slatedark-8 lg:block">
            <Toc />
          </aside>
        ) : null}
        <article
          className={cn(
            "prose prose-slate min-w-0 first-of-type:mb-6 prose-headings:scroll-mt-32 prose-headings:text-indigo-11 prose-headings:no-underline prose-h2:font-bold prose-p:tracking-wider prose-a:text-blue-11 prose-a:no-underline hover:prose-a:underline dark:text-slatedark-12 dark:prose-headings:text-yellowdark-11 dark:prose-a:text-bluedark-11",
            {
              "max-w-[724px]": post?.layout === "blog",
              "max-w-[724px] mx-auto w-full": post?.layout === "full",
            },
          )}
        >
          <MdxComponent code={post.body.code} />
        </article>
      </div>
    </section>
  )
}

export default Page

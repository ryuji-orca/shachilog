import { notFound } from "next/navigation"
import { type Metadata } from "next/types"

import { MdxComponent } from "@/component/mdx/mdx-component"
import { Toc } from "@/component/toc"
import { TocFullPage } from "@/component/toc-full-page"
import { cn } from "@/util/cn"
import { getBlogMdxListItem } from "@/util/mdx-hook"
import { getBlogPosts } from "@/util/mdx-server"

export const generateStaticParams = async () => {
  const allBlogs = getBlogPosts()
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

  const { metadata, slug } = post

  return {
    title: metadata.title,
    description: metadata.summary,
    openGraph: {
      title: metadata.title,
      description: metadata.summary,
      type: "article",
      publishedTime: metadata.publishedAt,
      url: `https://shachilog.xyz/blog/${slug}`,
      images: [
        {
          url: `https://shachilog.xyz${metadata.image}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.title,
      description: metadata.summary,
      images: [`https://shachilog.xyz${metadata.image}`],
    },
  }
}

const Page = async ({ params }: { params: { slug: string } }) => {
  const post = getBlogPosts().find(post => {
    return post.slug === params.slug
  })

  if (!post) {
    notFound()
  }

  return (
    <section className="!col-[1/6] overflow-hidden">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: `https://shachilog.xyz${post.metadata.image}`,
            url: `https://shachilog.xyz/blog/${post.slug}`,
            author: {
              "@type": "Person",
              name: "ryuji",
            },
          }),
        }}
      />

      {post?.metadata.layout === "full" ? <TocFullPage /> : null}

      <div className="max-w-1096 mx-auto px-6 text-center">
        <h1 className="text-balance pb-6 pt-16 text-2xl font-bold leading-normal tracking-wider text-slate-12 dark:text-slatedark-12 sm:text-3xl">
          {post.metadata.title}
        </h1>

        <div className="text-slate-11 dark:text-slatedark-11">
          {post.metadata.publishedAt}
        </div>
      </div>
      <div className="max-w-1096 mx-auto mt-12 flex flex-row-reverse justify-center gap-6 border-t border-indigo-6 p-6 dark:border-indigodark-6 lg:justify-between">
        {post?.metadata.layout === "blog" ? (
          <aside className="sticky top-32 mt-6 hidden max-h-[calc(100vh_-_148px)] max-w-[264px] overflow-auto scrollbar scrollbar-track-indigo-1 scrollbar-thumb-slate-8 scrollbar-thumb-rounded scrollbar-w-[4px] prose-ol:list-none dark:scrollbar-track-indigodark-1 dark:scrollbar-thumb-slatedark-8 lg:block">
            <Toc />
          </aside>
        ) : null}
        <article
          className={cn(
            "prose prose-slate min-w-0 first-of-type:mb-6 prose-headings:scroll-mt-32 prose-headings:text-indigo-11 prose-headings:no-underline prose-h2:font-bold prose-p:tracking-wider prose-a:text-blue-11 prose-a:no-underline hover:prose-a:underline dark:text-slatedark-12 dark:prose-headings:text-yellowdark-11 dark:prose-a:text-bluedark-11",
            {
              "max-w-[724px]": post?.metadata.layout === "blog",
              "max-w-[724px] mx-auto w-full": post?.metadata.layout === "full",
            },
          )}
        >
          <MdxComponent source={post.content} />
        </article>
      </div>
    </section>
  )
}

export default Page

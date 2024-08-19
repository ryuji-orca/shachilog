import Link from "next/link"

import { getBlogPosts } from "@/util/mdx-server"

export const metadata = {
  title: "記事一覧",
  description: "ブログの記事一覧ページです。",
}

const Blog = () => {
  const posts = getBlogPosts()
  return (
    <section className="min-h-screen px-6 py-16 md:py-24">
      <h1 className="pb-6 text-3xl text-slate-12 dark:text-slatedark-12">
        Blog
      </h1>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(272px,_1fr))] justify-between gap-6">
        {posts.map(post => {
          return (
            <Link
              key={post.slug}
              className="group inline-block items-end rounded-xl bg-indigo-3 p-8 dark:bg-indigodark-2 dark:shadow-2xl"
              href={`/blog/${post.slug}`}
            >
              <div className="flex h-full flex-col justify-between gap-4">
                <h2 className="text-xl leading-relaxed text-slate-12 group-hover:text-indigo-8 dark:text-slatedark-12 dark:group-hover:text-indigodark-8">
                  {post.metadata.title}
                </h2>
                <div className="ml-auto">
                  <p className="text-sm text-slate-11 dark:text-slatedark-11">
                    {post.metadata.publishedAt}
                  </p>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export default Blog

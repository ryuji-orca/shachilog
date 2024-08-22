import { notFound } from "next/navigation"

import { MdxComponent } from "@/component/mdx/mdx-component"
import { cn } from "@/util/cn"
import { getAboutPosts } from "@/util/mdx-server"

export const generateStaticParams = async () => {
  const allAboutPosts = getAboutPosts()
  return allAboutPosts.map(post => {
    return {
      slug: post.slug,
    }
  })
}

const AboutDetail = ({ params }: { params: { id: string } }) => {
  const post = getAboutPosts().find(post => {
    return post.slug === params.id
  })

  if (!post) {
    notFound()
  }

  return (
    <section className="min-h-screen pt-2">
      <div className="max-w-1096 mx-auto px-6 text-center">
        <h1 className="text-balance pb-6 pt-16 text-2xl font-bold leading-normal tracking-wider text-slate-12 dark:text-slatedark-12 sm:text-3xl">
          {post.metadata.title}
        </h1>
      </div>
      <div className="max-w-1096 mx-auto mt-12 flex flex-row-reverse justify-center gap-6 border-t border-indigo-6 p-6 dark:border-indigodark-6 lg:justify-between">
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
export default AboutDetail

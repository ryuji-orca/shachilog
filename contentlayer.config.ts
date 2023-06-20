import {
  defineDocumentType,
  makeSource,
  type ComputedFields,
} from "contentlayer/source-files"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields: ComputedFields = {
  // slug: {
  //   type: "string",
  //   resolve: doc => {
  //     return doc._raw.flattenedPath
  //   },
  // },

  structuredData: {
    type: "mdx",
    resolve: doc => {
      return {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: doc.title,
        datePublished: doc.publishedAt,
        dateModified: doc.publishedAt,
        description: doc.summary,
        image: doc.image ? `https://${doc.image}` : ``,
        url: `https://ryuji/blog/${doc._raw.flattenedPath}`,
        author: {
          "@type": "Person",
          name: "ryuji",
        },
      }
    },
  },
}

export const Blog = defineDocumentType(() => {
  return {
    name: "Blog",
    filePathPattern: `**/*.mdx`,
    contentType: "mdx",
    fields: {
      title: {
        type: "string",
        description: "タイトル",
        required: true,
      },
      slug: {
        type: "string",
        description: "slug",
        required: true,
      },
      publishedAt: {
        type: "string",
        description: "公開日",
        required: true,
      },
      tags: {
        type: "list",
        of: {
          type: "string",
        },
        description: "タグ",
        required: true,
      },
      summary: {
        type: "string",
        required: true,
      },
      image: {
        type: "string",
      },
    },
    computedFields,
  }
})

export default makeSource({
  contentDirPath: "content/blog",
  documentTypes: [Blog],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: "one-dark-pro",

          onVisitLine(node: { children: string | any[] }) {
            if (node.children.length === 0) {
              node.children = [{ type: "text", value: " " }]
            }
          },
          onVisitHighlightedLine(node: {
            properties: { className: string[] }
          }) {
            node.properties.className.push("line--highlighted")
          },
          onVisitHighlightedWord(node: {
            properties: { className: string[] }
          }) {
            node.properties.className = ["word--highlighted"]
          },
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ["anchor"],
            ariaHidden: true,
            tabIndex: -1,
          },
          behavior: "prepend",
        },
      ],
    ],
  },
})

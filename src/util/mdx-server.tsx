import fs from "fs"
import path from "path"

type Metadata = {
  title: string
  publishedAt: string
  summary: string
  image?: string
  // layout?: "blog" | "full"
  layout: string
}

const parseFrontmatter = (fileContent: string) => {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/
  const match = frontmatterRegex.exec(fileContent)
  const frontMatterBlock = match![1]
  const content = fileContent.replace(frontmatterRegex, "").trim()
  const frontMatterLines = frontMatterBlock.trim().split("\n")
  const metadata: Partial<Metadata> = {}

  frontMatterLines.forEach(line => {
    const [key, ...valueArr] = line.split(": ")
    let value = valueArr.join(": ").trim()
    value = value.replace(/^['"](.*)['"]$/, "$1")
    metadata[key.trim() as keyof Metadata] = value
  })

  return { metadata: metadata as Metadata, content }
}

const getMdxFiles = (dir: string) => {
  const files = fs.readdirSync(dir)
  const mdxFiles = files.filter(file => {
    return path.extname(file) === ".mdx"
  })
  return mdxFiles
}

// const getMdxFile = (dir: string, fileName: string) => {
//   const fullPath = path.join(dir, fileName)
//   const fileContent = fs.readFileSync(fullPath, "utf8")
//   return parseFrontmatter(fileContent)
// }

const readMdxFile = (filePath: string) => {
  const rawContent = fs.readFileSync(filePath, "utf-8")
  return parseFrontmatter(rawContent)
}

const getMdxData = (dir: string) => {
  const mdxFiles = getMdxFiles(dir)
  return mdxFiles.map(file => {
    const { metadata, content } = readMdxFile(path.join(dir, file))
    const slug = path.basename(file, path.extname(file))
    return {
      metadata,
      slug,
      content,
    }
  })
}

export const getBlogPosts = () => {
  return getMdxData(path.join(process.cwd(), "content/blog")).sort((a, b) => {
    return (
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
    )
  })
}

export const getAboutPosts = () => {
  return getMdxData(path.join(process.cwd(), "content/about"))
}

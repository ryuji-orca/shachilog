import {
  Children,
  createElement,
  type AnchorHTMLAttributes,
  type DetailedHTMLProps,
  type FC,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
} from "react"
import Image from "next/image"
import Link from "next/link"

import { cn } from "@/util/cn"
import { shimmer, toBase64 } from "@/util/shimmer"
import { cva, type VariantProps } from "class-variance-authority"
import { AlertCircle, AlertTriangleIcon, CheckCircle } from "lucide-react"
import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc"
import { Tweet } from "react-tweet"
import { highlight } from "sugar-high"

import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import { RadixCodeBlock } from "../ui/code"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import { MerkleTreeIntro } from "./merkle-tree"
import { RadioProvider, SbtAndNft } from "./sbt"

const Bold = ({ children }: { children: ReactNode }) => {
  return <span className="font-bold">{children}</span>
}

type CustomLinkProps = Omit<Parameters<typeof Link>["0"], "href"> & {
  href: string
}

const CustomLink: FC<
  CustomLinkProps | AnchorHTMLAttributes<HTMLAnchorElement>
> = ({ href, ...rest }) => {
  if (href != undefined) {
    if (href.startsWith("/")) {
      return <Link href={href} {...rest} />
    }
    if (href.startsWith("#")) {
      return (
        <a
          className="!text-yellow-11 dark:!text-yellowdark-11"
          href={href}
          {...rest}
        />
      )
    }
  }
  return (
    <a
      target="_blank"
      href={href}
      rel="noopener noreferrer"
      className="font-medium text-blue-11 underline-offset-4 hover:!underline dark:text-bluedark-11"
      {...rest}
    />
  )
}

type RoundedImageProps = {
  quoteText?: string
  quoteLink?: string
} & Parameters<typeof Image>[0]

const RoundedImage: FC<RoundedImageProps> = ({
  src,
  alt,
  quoteText = "画像の引用先",
  quoteLink,
  width,
  height,
  ...rest
}) => {
  return (
    <div>
      {quoteText && quoteLink ? (
        <blockquote className="my-6 border-none p-0">
          <Image
            className="mb-4 h-auto w-full max-w-full rounded-lg"
            src={src}
            alt={alt}
            width={width}
            height={height}
            placeholder={`data:image/svg+xml;base64,${toBase64(
              shimmer(width, height),
            )}`}
            {...rest}
          />
          <Link
            href={quoteLink}
            target="_blank"
            className="ml-auto block w-fit text-sm"
          >
            {quoteText}
          </Link>
        </blockquote>
      ) : (
        <Image
          className="rounded-lg"
          src={src}
          alt={alt}
          width={width}
          height={height}
          placeholder={`data:image/svg+xml;base64,${toBase64(
            shimmer(width, height),
          )}`}
          {...rest}
        />
      )}
    </div>
  )
}

type CustomTableProps = {
  heads?: string[]
  data: string[][]
  caption?: string
}
const CustomTable: FC<CustomTableProps> = ({ heads, caption, data }) => {
  return (
    <Table className="not-prose">
      {caption ? <TableCaption>{caption}</TableCaption> : null}
      {heads ? (
        <TableHeader>
          <TableRow>
            {heads.map(head => {
              return <TableHead key={head}>{head}</TableHead>
            })}
          </TableRow>
        </TableHeader>
      ) : null}
      <TableBody>
        {data.map((rows, index) => {
          return (
            <TableRow key={rows[index]}>
              {rows.map(cell => {
                return (
                  <TableCell
                    key={cell}
                    className="first-of-type:w-1/3 sm:first-of-type:w-1/4"
                  >
                    {cell}
                  </TableCell>
                )
              })}
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

type AlertCardProps = {
  title: string
  variant?: "ghost" | "warning" | "notice" | "pro"
  children: ReactNode
}

const AlertCard: FC<AlertCardProps> = ({
  title,
  variant = "notice",
  children,
}) => {
  return (
    <Alert className="not-prose mb-16 mt-12" variant={variant}>
      {variant === "notice" ? (
        <AlertCircle className="hidden size-6 md:block" />
      ) : variant === "pro" ? (
        <CheckCircle className="hidden size-6 md:block" />
      ) : variant === "warning" ? (
        <AlertTriangleIcon className="hidden size-6 md:block" />
      ) : null}
      <AlertTitle>{title}</AlertTitle>
      <div className="[&>*:not(:last-child)]:mb-4">
        {Children.map(children, child => {
          return <AlertDescription>{child}</AlertDescription>
        })}
      </div>
    </Alert>
  )
}

const CodeBlock = ({ title, text }: { title: string; text?: string }) => {
  return <RadixCodeBlock title={title} text={text} />
}

const CustomList = ({
  list,
}: {
  list: (string | ReactElement<Parameters<typeof Link>["0"]>)[]
}) => {
  return (
    <ul className="list-inside list-disc marker:text-indigo-10 [&>*:not(:last-child)]:mb-4">
      {list?.map(listBlock => {
        if (typeof listBlock === "string") {
          return <li key={listBlock}>{listBlock}</li>
        }

        if (
          typeof listBlock === "object" &&
          typeof listBlock.props.href === "string"
        ) {
          return <li key={listBlock.props.href}>{listBlock}</li>
        }
      })}
    </ul>
  )
}

export const sectionVariants = cva(
  "not-prose relative my-12 py-12 before:absolute before:inset-x-[-10000px] before:inset-y-0 before:h-full before:border-y-2 md:py-24 ",
  {
    variants: {
      color: {
        blue: " before:border-blue-9 dark:before:border-bluedark-9",
        pink: "before:border-pink-9 dark:before:border-pinkdark-9",
        violet: "before:border-violet-9 dark:before:border-violetdark-9",
        orange: "before:border-orange-9 dark:before:border-orangedark-9",
        mint: "before:border-mint-9 dark:before:border-mintdark-9",
        tomato: "before:border-tomato-9 dark:before:border-tomatodark-9",
        sky: "before:border-sky-9 dark:before:border-skydark-9",
        yellow: "before:border-yellow-9 dark:before:border-yellowdark-9",
        lime: "before:border-lime-9 dark:before:border-limedark-9",
        teal: "before:border-teal-9 dark:before:border-tealdark-9",
      },
    },
    defaultVariants: {
      color: "blue",
    },
  },
)

type SectionProps = {
  title: string
  chapterNumber?: number
} & HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof sectionVariants>

const Section = ({ title, chapterNumber, color }: SectionProps) => {
  const id = title.toLowerCase()
  return (
    <section className={cn(sectionVariants({ color }))}>
      <div className="relative text-slate-12 dark:text-slatedark-12 ">
        {chapterNumber ? (
          <p className="mb-3 text-center font-medium">
            CHAPTER {chapterNumber}
          </p>
        ) : null}

        <h2
          id={id}
          className="ralative text-balance text-center text-2xl font-semibold leading-normal tracking-wider sm:text-3xl"
        >
          {title}
        </h2>
      </div>
    </section>
  )
}

const X = ({ id }: { id: string }) => {
  return (
    <div className="not-prose">
      <Tweet id={id} />
    </div>
  )
}

const AnchorLink = ({ id }: { id: string }) => {
  return (
    <a className="anchor" href={`#${id}`} aria-hidden="true" tabIndex={-1}>
      <div className="anchor visually-hidden">permalink</div>
      <svg
        className="autolink-svg"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M9.199 13.599a5.99 5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992 5.992 0 0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242 6.003 6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985 3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005 3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201 13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995 2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0 0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836 19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997 0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632 1.563 1 1 0 0 0 1.602-1.198z"></path>
      </svg>
    </a>
  )
}

const FullPageH2 = ({ title }: { title: string }) => {
  const id = title.toLowerCase()
  return (
    <h2 id={id} className="js-toc-ignore">
      {title}
      <AnchorLink id={id} />
    </h2>
  )
}

const FullPageH3 = ({ title }: { title: string }) => {
  const id = title.toLowerCase()
  return (
    <h3 id={id} className="js-toc-ignore">
      {title}
      <AnchorLink id={id} />
    </h3>
  )
}

const FullPageH4 = ({ title }: { title: string }) => {
  const id = title.toLowerCase()
  return (
    <h4 id={id} className="js-toc-ignore">
      {title}
      <AnchorLink id={id} />
    </h4>
  )
}

type CodeProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
  children?: React.ReactNode // `children` を `string` 型として扱う
}

const Code: FC<CodeProps> = ({ children, ...props }): React.ReactNode => {
  // Check if children is a string and perform operations if true
  if (typeof children === "string") {
    const codeHTML = highlight(children)
    return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />
  }
  // Optionally handle or return null if children is not a string
  return null
}

const slugify = (str: any) => {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters except for -
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
}

const createHeading = (level: number) => {
  // eslint-disable-next-line react/display-name
  return ({ children }: { children?: React.ReactNode }) => {
    const slug = slugify(children)
    return createElement(
      `h${level}`,
      { id: slug },
      [
        createElement("a", {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: "anchor",
        }),
      ],
      children,
    )
  }
}

createHeading.displayName = `Heading`

const components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Bold,
  Image: RoundedImage,
  a: CustomLink,
  AlertCard,
  CodeBlock,
  CustomList,
  CustomTable,
  Section,
  X,
  code: Code,
  FullPageH2,
  FullPageH3,
  FullPageH4,
}

const addComponents = {
  MerkleTreeIntro: ({
    showBoxList,
    showBoxData,
    showChangeRadiusAndWeight,
  }: {
    showBoxList?: boolean
    showBoxData?: boolean
    showChangeRadiusAndWeight?: boolean
  }) => {
    return (
      <MerkleTreeIntro
        showBoxList={showBoxList}
        showBoxData={showBoxData}
        showChangeRadiusAndWeight={showChangeRadiusAndWeight}
      />
    )
  },
  SbtAndNft: () => {
    return (
      <RadioProvider>
        <SbtAndNft />
      </RadioProvider>
    )
  },
}

export const MdxComponent: FC<MDXRemoteProps> = props => {
  return (
    <div className="js-toc-content full-page-toc-content">
      <MDXRemote
        {...props}
        components={{
          ...components,
          ...addComponents,
          h1: createHeading(1),
          code: Code,
          // eslint-disable-next-line react/destructuring-assignment
          ...props.components,
        }}
      />
    </div>
  )
}

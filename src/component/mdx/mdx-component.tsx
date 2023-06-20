import {
  Children,
  type AnchorHTMLAttributes,
  type FC,
  type ReactElement,
  type ReactNode,
} from "react"
import Image from "next/image"
import Link from "next/link"

import { AlertCircle, AlertTriangleIcon, CheckCircle } from "lucide-react"
import { useMDXComponent } from "next-contentlayer/hooks"

import {
  Alert,
  AlertDescription,
  AlertTitle,
  Code,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui"
import { MerkleTreeIntro } from "./merkle-tree"

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

const RoundedImage: FC<Parameters<typeof Image>[0]> = ({
  src,
  alt,
  ...rest
}) => {
  return <Image src={src} alt={alt} className="rounded-lg" {...rest} />
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
        <AlertCircle className="hidden h-6 w-6 md:block" />
      ) : variant === "pro" ? (
        <CheckCircle className="hidden h-6 w-6 md:block" />
      ) : variant === "warning" ? (
        <AlertTriangleIcon className="hidden h-6 w-6 md:block" />
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
  return <Code title={title} text={text} />
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

const components = {
  Bold,
  Image: RoundedImage,
  a: CustomLink,
  AlertCard,
  Code: CodeBlock,
  CustomList,
  CustomTable,
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
}

type MdxComponentProps = {
  code: string
}

/**
 * @package
 */
export const MdxComponent: FC<MdxComponentProps> = ({ code }) => {
  const Component = useMDXComponent(code)

  return (
    <div className="js-toc-content">
      <Component components={{ ...components, ...addComponents }} />
    </div>
  )
}

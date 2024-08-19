import { Code as RadixCode } from "@radix-ui/themes"

const RadixCodeBlock = ({ title, text }: { title: string; text?: string }) => {
  return (
    <>
      <RadixCode variant="soft" size="3">
        {title}
      </RadixCode>
      {text ? (
        <span className="ml-1 align-middle text-slate-12 dark:text-slatedark-12">
          {text}
        </span>
      ) : null}
    </>
  )
}

export { RadixCodeBlock }

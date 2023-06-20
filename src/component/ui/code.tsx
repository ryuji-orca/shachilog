/**
 * @package
 */
export const Code = ({ title, text }: { title: string; text?: string }) => {
  return (
    <>
      <code className="relative rounded bg-slate-5 px-[6px] py-[4.5px] font-mono text-sm text-slate-12 dark:bg-slatedark-5 dark:text-slatedark-12">
        {title}
      </code>
      {text ? (
        <span className="ml-1 align-middle text-slate-12 dark:text-slatedark-12">
          {text}
        </span>
      ) : null}
    </>
  )
}

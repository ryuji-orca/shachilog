import type { ReactNode } from "react"

export const Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="rounded-lg border border-indigo-6 px-6 py-4 dark:border-indigodark-6">
      {children}
    </div>
  )
}

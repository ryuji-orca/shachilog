import { BookOpenIcon, User as UserIcon } from "lucide-react"
import Link from "next/link"
import  { type FC, type ReactNode } from "react"

import { cn } from "@/util/cn"

type LinkCardProps = {
  name: string
  icon: ReactNode
  href: string
  customCSS?: string
}

const LinkCard: FC<LinkCardProps> = ({ name, icon, href, customCSS }) => {
  return (
    <li>
      <Link
        href={href}
        className={cn(
          `dark:from-bluedark-2 from-blue-2 dark:to-bluedark-6 to-blue-6 dark:bg-bluedark-6 bg-blue-5 flex aspect-square flex-col items-center justify-center rounded-xl dark:bg-gradient-to-b dark:shadow-2xl dark:bg-transparent md:hover:scale-105 md:transition-all md:ease-in`,
          customCSS,
        )}
      >
        <div className="flex flex-col items-center justify-center gap-2">
          {icon}
          <h3 className="text-xl text-slate-12 dark:text-slatedark-12">
            {name}
          </h3>
        </div>
      </Link>
    </li>
  )
}

const Home = () => {
  return (
    <div className="px-6 pt-16 md:pt-24">
      <div>
        <ul className="grid grid-cols-1 justify-between gap-8 pt-16 md:grid-cols-2">
          <LinkCard
            name="Blog"
            icon={
              <BookOpenIcon className="size-16 text-slate-12 dark:text-slatedark-12" />
            }
            href="/blog"
          />

          <LinkCard
            name="About"
            icon={
              <UserIcon className="size-16 text-slate-12 dark:text-slatedark-12" />
            }
            href="/about"
            customCSS="dark:from-cyandark-2 from-cyan-2 dark:to-cyandark-6 to-cyan-6 bg-cyan-5 dark:bg-cyandark-6"
          />
        </ul>
      </div>
    </div>
  )
}

export default Home

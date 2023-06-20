"use client"

import Link from "next/link"

import { GitHubLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons"

const LINKS = [
  {
    icon: (
      <TwitterLogoIcon className="h-6 w-6 text-slate-12 dark:text-slatedark-12" />
    ),
    href: "/blog",
  },
  {
    icon: (
      <GitHubLogoIcon className="h-6 w-6 text-slate-12 dark:text-slatedark-12" />
    ),
    href: "/about",
  },
]

const NavLink = ({
  href,
  ...rest
}: Omit<Parameters<typeof Link>["0"], "href"> & { href: string }) => {
  return (
    <li>
      <Link href={href} {...rest} />
    </li>
  )
}

/**
 * @package
 */
export const Footer = () => {
  return (
    <div className="border-t border-indigo-6 dark:border-indigodark-6">
      <footer className="mx-auto max-w-3xl p-8">
        <ul className="flex items-center justify-center gap-5 pb-6">
          {LINKS.map(({ icon, href }) => {
            return (
              <NavLink key={href} href={href}>
                {icon}
              </NavLink>
            )
          })}
        </ul>
        <div className="flex items-center justify-center">
          <span className="block text-slate-11 dark:text-slatedark-11">
            © 2023 ryuji
          </span>
        </div>
      </footer>
    </div>
  )
}

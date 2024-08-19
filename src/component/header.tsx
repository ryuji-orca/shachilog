"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/util/cn"
import { LaptopIcon, Menu as MenuIcon, MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { ShachilogDark } from "public/image/common/shachilog-dark"
import { ShachilogLight } from "public/image/common/shachilog-light"

import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"

const LINKS = [
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
]

const ModeToggle = () => {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 px-0 hover:bg-slate-4 dark:hover:bg-slatedark-4"
        >
          <SunIcon className="rotate-0 scale-100 text-slatedark-2 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute rotate-90 scale-0 text-slate-2 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="border-indigo-6 bg-indigo-3 dark:border-indigodark-6 dark:bg-indigodark-3"
      >
        <DropdownMenuItem
          className="cursor-pointer hover:bg-indigo-4 dark:hover:bg-indigodark-4"
          onClick={() => {
            return setTheme("light")
          }}
        >
          <SunIcon className="mr-2 h-4 w-4 text-slatedark-2  dark:text-slate-2" />
          <span className="text-slatedark-2  dark:text-slate-2">Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer hover:bg-indigo-4 dark:hover:bg-indigodark-4"
          onClick={() => {
            return setTheme("dark")
          }}
        >
          <MoonIcon className="mr-2 h-4 w-4 text-slatedark-2  dark:text-slate-2" />
          <span className="text-slatedark-2 dark:text-slate-2">Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer hover:bg-indigo-4 dark:hover:bg-indigodark-4"
          onClick={() => {
            return setTheme("system")
          }}
        >
          <LaptopIcon className="mr-2 h-4 w-4 text-slatedark-2  dark:text-slate-2" />
          <span className="text-slatedark-2  dark:text-slate-2">System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const MobileMenu = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <MenuIcon className="text-slate-12 dark:text-slatedark-12" />
      </SheetTrigger>

      <SheetContent size="full" className="flex h-3/4 flex-col justify-between">
        <div className="flex flex-col gap-6 pt-28">
          {LINKS.map(({ name, href }) => {
            return (
              <div key={name} className="text-slate-12 dark:text-slatedark-12">
                <a className="text-2xl" href={href}>
                  {name}
                </a>
              </div>
            )
          })}
        </div>
      </SheetContent>
    </Sheet>
  )
}

const NavLink = ({
  href,
  ...rest
}: Omit<Parameters<typeof Link>["0"], "href"> & { href: string }) => {
  const pathname = usePathname()
  const isActive = pathname === href
  return (
    <li>
      <Link
        className={cn("text-base dark:text-slatedark-11 text-slate-11", {
          "dark:border-yellowdark-10 border-indigo-10 border-b pb-2 border-dashed":
            isActive,
          "": !isActive,
        })}
        href={href}
        {...rest}
      />
    </li>
  )
}

export const Header = () => {
  const pathname = usePathname()
  return (
    <div className="sticky top-0 z-10 border-b border-indigo-6 bg-indigo-1/75 backdrop-blur dark:border-indigodark-6 dark:bg-indigodark-1/75">
      <header className="max-w-1096 mx-auto flex flex-col  justify-center px-6 py-4 md:p-6">
        <nav className="flex items-end justify-between gap-8 md:items-center">
          <Link href="/" className="block  w-auto">
            {pathname === "/" ? (
              <h1>
                <span className="hidden dark:block">
                  <ShachilogLight />
                </span>
                <span className="block dark:hidden">
                  <ShachilogDark />
                </span>
              </h1>
            ) : (
              <div>
                <span className="hidden dark:block">
                  <ShachilogLight />
                </span>
                <span className="block dark:hidden">
                  <ShachilogDark />
                </span>
              </div>
            )}
          </Link>
          <div className="flex items-center gap-6">
            <ul className="hidden items-center gap-5 md:flex">
              {LINKS.map(({ name, href }) => {
                return (
                  <NavLink key={name} href={href}>
                    {name}
                  </NavLink>
                )
              })}
            </ul>
            <div className="md:hidden">
              <MobileMenu />
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}

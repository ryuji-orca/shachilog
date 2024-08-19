"use client"

import { useEffect } from "react"

import tocbot from "tocbot"

const Toc = () => {
  useEffect(() => {
    tocbot?.init({
      tocSelector: ".js-toc",
      contentSelector: ".js-toc-content",
      headingSelector: "h2, h3",
      headingsOffset: 124,
      scrollSmoothOffset: -124,
    })
    return () => {
      return tocbot.destroy()
    }
  }, [])

  return (
    <div>
      <h2 className="mb-4 text-base font-medium uppercase text-slate-12 dark:text-slatedark-12">
        Table of Contents
      </h2>
      <div className="js-toc"></div>
    </div>
  )
}

export { Toc }

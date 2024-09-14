"use client"

import { useEffect, useState } from "react"

import { cn } from "@/util/cn"
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion"
import { ClipboardListIcon, XCircleIcon } from "lucide-react"
import * as tocbot from "tocbot"

const TocFullPage = () => {
  const [selectedId, setSelectedId] = useState(false)
  const { scrollY } = useScroll()
  const [y, setY] = useState(0)

  useEffect(() => {
    tocbot.init({
      tocSelector: ".full-page-toc",
      contentSelector: ".full-page-toc-content",
      headingSelector: "h2",
      headingsOffset: 124,
      scrollSmoothOffset: -264,
      ignoreSelector: ".js-toc-ignore",
    })

    return () => {
      return tocbot.destroy()
    }
  }, [])

  useMotionValueEvent(scrollY, "change", latest => {
    setY(latest)
  })

  return (
    <div className="">
      <AnimatePresence>
        {!selectedId && y > 940 && (
          <motion.div
            className="fixed bottom-6 right-6 z-10 flex aspect-square size-12 items-center justify-center rounded-full bg-indigo-4 p-2 shadow-xl dark:bg-indigodark-4"
            onClick={() => {
              return setSelectedId(true)
            }}
            initial={{ translateX: 100, opacity: 0 }}
            animate={{ translateX: 0, opacity: 1 }}
            exit={{ translateX: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: "backOut", delay: 0.7 }}
          >
            <motion.button>
              <ClipboardListIcon size={24} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          initial={{ translateY: 300 }}
          animate={
            selectedId
              ? {
                  translateY: -86,
                  // visibility: "visible",
                  // opacity: 1,
                }
              : {}
          }
          exit={{ translateY: -100 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className={cn(
            "fixed -bottom-16 right-6 z-50 flex flex-col bg-indigo-4 dark:bg-indigodark-4 p-4 rounded-2xl shadow-xl gap-2 border border-indigo-6 dark:border-indigodark-6",
          )}
        >
          <motion.button
            className="ml-auto"
            onClick={() => {
              return setSelectedId(false)
            }}
          >
            <XCircleIcon
              className="text-indigo-12 dark:text-indigodark-12"
              size={24}
            />
          </motion.button>

          <motion.div className="full-page-toc" />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export { TocFullPage }

"use client"

import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center gap-6 text-slate-12">
      <h2>残念ながら何かエラーが発生しました！</h2>
      <button
        onClick={() => {
          return reset()
        }}
      >
        再読み込みする
      </button>
    </div>
  )
}

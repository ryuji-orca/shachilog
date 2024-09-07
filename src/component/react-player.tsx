"use client"

import { useEffect, useState, type FC } from "react"
import Image from "next/image"

import { shimmer, toBase64 } from "@/util/shimmer"
import ReactPlayer from "react-player/youtube"

type ReactPlayerYoutubeType = {
  url: string
  width: number
  height: number
  size: "md" | "full"
}

const ReactPlayerYoutube: FC<ReactPlayerYoutubeType> = ({
  url,
  size = "md",
}) => {
  const [isClient, setIsClient] = useState(false)
  const videoSize = (size: string) => {
    switch (size) {
      case "md":
        return {
          width: 802,
          height: 451,
        }
      case "full":
        return {
          width: 1048,
          height: 590,
        }
    }
  }

  useEffect(() => {
    setIsClient(true)
  }, [])

  return isClient ? (
    <div className="my-8 flex justify-center">
      <ReactPlayer url={url} {...videoSize(size)} light={false} loop={true} />
    </div>
  ) : (
    <Image
      {...videoSize(size)}
      sizes="100vw"
      src={`data:image/svg+xml;base64,${toBase64(shimmer(videoSize(size)?.width, videoSize(size)?.height))}`}
      alt="blur image"
    />
  )
}

export { ReactPlayerYoutube }

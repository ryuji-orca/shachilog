"use client"

import Image from "next/image"
import { useEffect, useState, type FC } from "react"

import ReactPlayer from "react-player/youtube"
import { shimmer, toBase64 } from "@/util/shimmer"

type ReactPlayerYoutubeType = {
  url: string
}

const ReactPlayerYoutube: FC<ReactPlayerYoutubeType> = ({ url }) => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return isClient ? (
    <div className="relative my-8 flex justify-center pt-[56.25%]">
      <ReactPlayer
        style={{ position: "absolute", top: 0, left: 0 }}
        url={url}
        light={false}
        loop={true}
        width="100%"
        height="100%"
      />
    </div>
  ) : (
    <Image
      width={1048}
      height={590}
      sizes="100vw"
      src={`data:image/svg+xml;base64,${toBase64(shimmer(1048, 590))}`}
      alt="blur image"
    />
  )
}

export { ReactPlayerYoutube }

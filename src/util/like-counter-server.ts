"use server"

import { createHash } from "crypto"
import { revalidatePath } from "next/cache"
import { headers } from "next/headers"

import { PrismaClient } from "@prisma/client"

const getHashedIp = () => {
  const forwardFor = headers().get("x-forwarded-for")
  const realIp = headers().get("x-real-ip")

  if (forwardFor) {
    const ipAddress = forwardFor.split(",")[0].trim()
    const ipAddressWithPepper = ipAddress + process.env.BLOG_PEPPER
    return createHash("sha256").update(ipAddressWithPepper).digest("hex")
  }

  if (realIp) {
    const ipAddressWithPepper = realIp + process.env.BLOG_PEPPER
    return createHash("sha256").update(ipAddressWithPepper).digest("hex")
  }

  return "123.456.789"
}

const prisma = new PrismaClient()
const handleLikeCounter = async ({ slug }: { slug: string }) => {
  const hashIp = getHashedIp()

  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        ipAddresses: hashIp,
      },
    })

    const userPostLike = await prisma.postLike.findFirst({
      where: {
        likesByUser: hashIp,
        postSlug: slug,
      },
    })

    // 5回までしかいいねできないようにする
    if (userPostLike?.count && userPostLike?.count >= 5) {
      throw new Error("You have reached the limit of likes")
    }

    if (!existingUser) {
      const newUser = await prisma.user.create({
        data: {
          ipAddresses: hashIp,
        },
      })

      await prisma.postLike.create({
        data: {
          postSlug: slug,
          userId: newUser.id,
          likesByUser: newUser.ipAddresses ?? "",
          count: 1,
        },
      })

      revalidatePath("/")
      return { message: "success" }
    }

    if (existingUser) {
      if (userPostLike) {
        await prisma.postLike.updateMany({
          where: {
            likesByUser: hashIp,
            postSlug: slug,
          },
          data: {
            count: {
              increment: 1,
            },
          },
        })
        revalidatePath("/")
        return { message: "success" }
      }

      await prisma.postLike.create({
        data: {
          postSlug: slug,
          userId: existingUser.id,
          likesByUser: existingUser.ipAddresses ?? "",
          count: 1,
        },
      })

      revalidatePath("/")
      return { message: "success" }
    }
  } catch (error) {
    console.error("error", error)
  }
}

export { getHashedIp, handleLikeCounter }

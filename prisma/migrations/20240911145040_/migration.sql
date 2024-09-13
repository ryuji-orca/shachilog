-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ipAddresses" TEXT,
    "role" TEXT NOT NULL DEFAULT 'MEMBER'
);

-- CreateTable
CREATE TABLE "PostLike" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "count" INTEGER NOT NULL,
    "postSlug" TEXT NOT NULL,
    "likesByUser" TEXT NOT NULL,
    "userId" TEXT,
    CONSTRAINT "PostLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_ipAddresses_key" ON "User"("ipAddresses");

-- CreateIndex
CREATE INDEX "PostLike_userId_postSlug_idx" ON "PostLike"("userId", "postSlug");

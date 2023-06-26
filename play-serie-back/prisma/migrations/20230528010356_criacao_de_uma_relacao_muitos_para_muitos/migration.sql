/*
  Warnings:

  - You are about to drop the column `status` on the `Series` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Series` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Series" DROP CONSTRAINT "Series_userId_fkey";

-- DropIndex
DROP INDEX "Series_userId_key";

-- AlterTable
ALTER TABLE "Series" DROP COLUMN "status",
DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "UserOnSeries" (
    "id" TEXT NOT NULL,
    "status" "Status",
    "userId" TEXT NOT NULL,
    "serieId" TEXT NOT NULL,

    CONSTRAINT "UserOnSeries_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserOnSeries" ADD CONSTRAINT "UserOnSeries_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnSeries" ADD CONSTRAINT "UserOnSeries_serieId_fkey" FOREIGN KEY ("serieId") REFERENCES "Series"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

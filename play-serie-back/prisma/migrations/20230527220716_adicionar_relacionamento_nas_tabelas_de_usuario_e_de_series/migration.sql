/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Series` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Series" ADD COLUMN     "userId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Series_userId_key" ON "Series"("userId");

-- AddForeignKey
ALTER TABLE "Series" ADD CONSTRAINT "Series_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

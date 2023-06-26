-- CreateEnum
CREATE TYPE "Status" AS ENUM ('DESEJO_ASSISTIR', 'GOSTEI');

-- AlterTable
ALTER TABLE "Series" ADD COLUMN     "status" "Status";

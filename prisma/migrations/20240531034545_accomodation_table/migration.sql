/*
  Warnings:

  - Changed the type of `type` on the `Accommodation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "AccomodationType" AS ENUM ('VILLA', 'HOTEL', 'GUEST_HOUSE');

-- AlterTable
ALTER TABLE "Accommodation" DROP COLUMN "type",
ADD COLUMN     "type" "AccomodationType" NOT NULL;

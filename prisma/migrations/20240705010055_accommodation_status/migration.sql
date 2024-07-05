/*
  Warnings:

  - Added the required column `status` to the `Accommodation` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AccommodationStatus" AS ENUM ('ACTIVE', 'PERMANENT_CLOSED', 'TEMPORARY_CLOSED');

-- AlterTable
ALTER TABLE "Accommodation" ADD COLUMN     "status" "AccommodationStatus" NOT NULL;

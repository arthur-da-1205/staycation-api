/*
  Warnings:

  - You are about to drop the column `accommodation_id` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `accommodation_id` on the `Favourite` table. All the data in the column will be lost.
  - You are about to drop the `Accommodation` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[user_id,property_id]` on the table `Favourite` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `property_id` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `property_id` to the `Favourite` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PropertyType" AS ENUM ('VILLA', 'HOTEL', 'GUEST_HOUSE');

-- CreateEnum
CREATE TYPE "PropertyStatus" AS ENUM ('ACTIVE', 'PERMANENT_CLOSED', 'TEMPORARY_CLOSED');

-- DropForeignKey
ALTER TABLE "Accommodation" DROP CONSTRAINT "Accommodation_owner_id_fkey";

-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_accommodation_id_fkey";

-- DropForeignKey
ALTER TABLE "Favourite" DROP CONSTRAINT "Favourite_accommodation_id_fkey";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "accommodation_id",
ADD COLUMN     "property_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Favourite" DROP COLUMN "accommodation_id",
ADD COLUMN     "property_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Accommodation";

-- DropEnum
DROP TYPE "AccommodationStatus";

-- DropEnum
DROP TYPE "AccommodationType";

-- CreateTable
CREATE TABLE "Property" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "PropertyType" NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "status" "PropertyStatus" NOT NULL,
    "owner_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Favourite_property_id_idx" ON "Favourite"("property_id");

-- CreateIndex
CREATE INDEX "Favourite_user_id_idx" ON "Favourite"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Favourite_user_id_property_id_key" ON "Favourite"("user_id", "property_id");

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "Owner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favourite" ADD CONSTRAINT "Favourite_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

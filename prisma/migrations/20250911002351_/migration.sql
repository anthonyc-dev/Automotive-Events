/*
  Warnings:

  - You are about to drop the column `address` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `contactEmail` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `contactPhone` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `currentAttendees` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `featured` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `latitude` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `maxAttendees` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `publishedAt` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `shortDescription` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `ticketPrice` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `ticketUrl` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `websiteUrl` on the `events` table. All the data in the column will be lost.
  - Added the required column `date` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."events" DROP COLUMN "address",
DROP COLUMN "category",
DROP COLUMN "contactEmail",
DROP COLUMN "contactPhone",
DROP COLUMN "createdAt",
DROP COLUMN "currentAttendees",
DROP COLUMN "endDate",
DROP COLUMN "featured",
DROP COLUMN "imageUrl",
DROP COLUMN "latitude",
DROP COLUMN "longitude",
DROP COLUMN "maxAttendees",
DROP COLUMN "publishedAt",
DROP COLUMN "shortDescription",
DROP COLUMN "startDate",
DROP COLUMN "status",
DROP COLUMN "tags",
DROP COLUMN "ticketPrice",
DROP COLUMN "ticketUrl",
DROP COLUMN "updatedAt",
DROP COLUMN "websiteUrl",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION;

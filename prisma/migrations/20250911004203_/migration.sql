/*
  Warnings:

  - You are about to drop the column `date` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `events` table. All the data in the column will be lost.
  - Added the required column `startDate` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."events" DROP COLUMN "date",
DROP COLUMN "price",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "category" "public"."EventCategory" NOT NULL DEFAULT 'EXHIBITION',
ADD COLUMN     "contactEmail" TEXT,
ADD COLUMN     "contactPhone" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "currentAttendees" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "featured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "latitude" DOUBLE PRECISION,
ADD COLUMN     "longitude" DOUBLE PRECISION,
ADD COLUMN     "maxAttendees" INTEGER,
ADD COLUMN     "publishedAt" TIMESTAMP(3),
ADD COLUMN     "shortDescription" TEXT,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "status" "public"."EventStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "ticketPrice" DOUBLE PRECISION,
ADD COLUMN     "ticketUrl" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "websiteUrl" TEXT;

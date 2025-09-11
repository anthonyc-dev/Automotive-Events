/*
  Warnings:

  - You are about to drop the column `price` on the `events` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."events" DROP COLUMN "price",
ADD COLUMN     "ticketpPrice" DOUBLE PRECISION;

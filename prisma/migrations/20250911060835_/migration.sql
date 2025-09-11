/*
  Warnings:

  - You are about to drop the column `ticketpPrice` on the `events` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."events" DROP COLUMN "ticketpPrice",
ADD COLUMN     "price" DOUBLE PRECISION;

/*
  Warnings:

  - Added the required column `image_url` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "image_url" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "identity_number" DROP NOT NULL;

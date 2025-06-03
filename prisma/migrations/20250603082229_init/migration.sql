/*
  Warnings:

  - You are about to drop the column `userId` on the `Todo` table. All the data in the column will be lost.
  - Added the required column `email` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Todo" DROP CONSTRAINT "Todo_userId_fkey";

-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "userId",
ADD COLUMN     "email" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_email_fkey" FOREIGN KEY ("email") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

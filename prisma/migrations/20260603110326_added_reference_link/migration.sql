/*
  Warnings:

  - A unique constraint covering the columns `[referenceId]` on the table `Reference` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `referenceId` to the `Reference` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reference" ADD COLUMN     "referenceId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Reference_referenceId_key" ON "Reference"("referenceId");

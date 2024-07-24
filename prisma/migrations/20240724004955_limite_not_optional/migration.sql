/*
  Warnings:

  - Made the column `limite` on table `conta_corrente` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "conta_corrente" ALTER COLUMN "limite" SET NOT NULL;

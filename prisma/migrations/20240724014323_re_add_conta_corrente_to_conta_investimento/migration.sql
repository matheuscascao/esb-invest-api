/*
  Warnings:

  - A unique constraint covering the columns `[conta_corrente_id]` on the table `conta_investimento` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `conta_corrente_id` to the `conta_investimento` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "conta_investimento" ADD COLUMN     "conta_corrente_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "conta_investimento_conta_corrente_id_key" ON "conta_investimento"("conta_corrente_id");

-- AddForeignKey
ALTER TABLE "conta_investimento" ADD CONSTRAINT "conta_investimento_conta_corrente_id_fkey" FOREIGN KEY ("conta_corrente_id") REFERENCES "conta_corrente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

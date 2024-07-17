/*
  Warnings:

  - You are about to drop the column `conta_corrente_id` on the `conta_investimento` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "conta_investimento" DROP CONSTRAINT "conta_investimento_conta_corrente_id_fkey";

-- DropIndex
DROP INDEX "conta_investimento_conta_corrente_id_key";

-- AlterTable
ALTER TABLE "conta_corrente" ADD COLUMN     "contaInvestimentoId" INTEGER;

-- AlterTable
ALTER TABLE "conta_investimento" DROP COLUMN "conta_corrente_id";

-- AddForeignKey
ALTER TABLE "conta_corrente" ADD CONSTRAINT "conta_corrente_contaInvestimentoId_fkey" FOREIGN KEY ("contaInvestimentoId") REFERENCES "conta_investimento"("id") ON DELETE SET NULL ON UPDATE CASCADE;

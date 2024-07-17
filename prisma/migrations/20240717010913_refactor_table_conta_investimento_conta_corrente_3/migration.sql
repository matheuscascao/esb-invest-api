/*
  Warnings:

  - You are about to drop the column `contaInvestimentoId` on the `conta_corrente` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "conta_corrente" DROP COLUMN "contaInvestimentoId";

-- AlterTable
ALTER TABLE "conta_investimento" ALTER COLUMN "status_conta" SET DEFAULT 'ATIVA';

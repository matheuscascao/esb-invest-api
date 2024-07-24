/*
  Warnings:

  - You are about to drop the column `risco` on the `produto_financeiro` table. All the data in the column will be lost.
  - You are about to drop the column `taxa_transacao` on the `produto_financeiro` table. All the data in the column will be lost.
  - Added the required column `rentabilidade_anual` to the `produto_financeiro` table without a default value. This is not possible if the table is not empty.
  - Made the column `data_resgate` on table `produto_financeiro` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "produto_financeiro" DROP COLUMN "risco",
DROP COLUMN "taxa_transacao",
ADD COLUMN     "rentabilidade_anual" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "data_resgate" SET NOT NULL;

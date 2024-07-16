/*
  Warnings:

  - You are about to drop the column `name` on the `cliente` table. All the data in the column will be lost.
  - You are about to drop the column `data_atualizacao` on the `conta_corrente` table. All the data in the column will be lost.
  - You are about to drop the column `data_criacao` on the `conta_corrente` table. All the data in the column will be lost.
  - You are about to drop the column `saldo` on the `conta_corrente` table. All the data in the column will be lost.
  - You are about to drop the column `tipo_investidor` on the `conta_corrente` table. All the data in the column will be lost.
  - You are about to drop the column `data_atualizacao` on the `conta_investimento` table. All the data in the column will be lost.
  - You are about to drop the column `data_criacao` on the `conta_investimento` table. All the data in the column will be lost.
  - You are about to drop the column `limite` on the `conta_investimento` table. All the data in the column will be lost.
  - You are about to drop the column `data_criacao` on the `produto_financeiro` table. All the data in the column will be lost.
  - You are about to drop the column `data` on the `transacao` table. All the data in the column will be lost.
  - You are about to drop the column `data_transacao` on the `transacao_investimento` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[conta_corrente_id]` on the table `conta_investimento` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nome` to the `cliente` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `data_nascimento` on the `cliente` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `atualizado_em` to the `conta_corrente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `atualizado_em` to the `conta_investimento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `conta_corrente_id` to the `conta_investimento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `atualizado_em` to the `produto_financeiro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `atualizado_em` to the `transacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `atualizado_em` to the `transacao_investimento` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cliente" DROP COLUMN "name",
ADD COLUMN     "nome" TEXT NOT NULL,
DROP COLUMN "data_nascimento",
ADD COLUMN     "data_nascimento" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "conta_corrente" DROP COLUMN "data_atualizacao",
DROP COLUMN "data_criacao",
DROP COLUMN "saldo",
DROP COLUMN "tipo_investidor",
ADD COLUMN     "atualizado_em" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "conta_investimento" DROP COLUMN "data_atualizacao",
DROP COLUMN "data_criacao",
DROP COLUMN "limite",
ADD COLUMN     "atualizado_em" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "conta_corrente_id" INTEGER NOT NULL,
ADD COLUMN     "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "produto_financeiro" DROP COLUMN "data_criacao",
ADD COLUMN     "atualizado_em" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "data_resgate" DROP NOT NULL,
ALTER COLUMN "data_resgate" DROP DEFAULT;

-- AlterTable
ALTER TABLE "transacao" DROP COLUMN "data",
ADD COLUMN     "atualizado_em" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "transacao_investimento" DROP COLUMN "data_transacao",
ADD COLUMN     "atualizado_em" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "conta_investimento_conta_corrente_id_key" ON "conta_investimento"("conta_corrente_id");

-- AddForeignKey
ALTER TABLE "conta_investimento" ADD CONSTRAINT "conta_investimento_conta_corrente_id_fkey" FOREIGN KEY ("conta_corrente_id") REFERENCES "conta_corrente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

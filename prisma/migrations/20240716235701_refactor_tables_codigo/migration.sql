/*
  Warnings:

  - You are about to drop the column `clienteId` on the `conta_corrente` table. All the data in the column will be lost.
  - You are about to drop the column `codigo` on the `conta_corrente` table. All the data in the column will be lost.
  - You are about to drop the column `clienteId` on the `conta_investimento` table. All the data in the column will be lost.
  - You are about to drop the column `codigo` on the `conta_investimento` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cliente_id]` on the table `conta_corrente` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cliente_id]` on the table `conta_investimento` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cliente_id` to the `conta_corrente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cliente_id` to the `conta_investimento` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "conta_corrente" DROP CONSTRAINT "conta_corrente_clienteId_fkey";

-- DropForeignKey
ALTER TABLE "conta_investimento" DROP CONSTRAINT "conta_investimento_clienteId_fkey";

-- DropIndex
DROP INDEX "conta_corrente_clienteId_key";

-- DropIndex
DROP INDEX "conta_investimento_clienteId_key";

-- AlterTable
ALTER TABLE "conta_corrente" DROP COLUMN "clienteId",
DROP COLUMN "codigo",
ADD COLUMN     "cliente_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "conta_investimento" DROP COLUMN "clienteId",
DROP COLUMN "codigo",
ADD COLUMN     "cliente_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "conta_corrente_cliente_id_key" ON "conta_corrente"("cliente_id");

-- CreateIndex
CREATE UNIQUE INDEX "conta_investimento_cliente_id_key" ON "conta_investimento"("cliente_id");

-- AddForeignKey
ALTER TABLE "conta_corrente" ADD CONSTRAINT "conta_corrente_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conta_investimento" ADD CONSTRAINT "conta_investimento_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

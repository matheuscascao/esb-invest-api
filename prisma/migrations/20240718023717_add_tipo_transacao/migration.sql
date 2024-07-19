/*
  Warnings:

  - Changed the type of `tipo_transacao` on the `transacao` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TipoTransacao" AS ENUM ('ENTRADA', 'SAIDA');

-- AlterTable
ALTER TABLE "transacao" DROP COLUMN "tipo_transacao",
ADD COLUMN     "tipo_transacao" "TipoTransacao" NOT NULL;

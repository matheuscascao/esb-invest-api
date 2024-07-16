/*
  Warnings:

  - You are about to drop the `Cliente` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Conta` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProdutoFinanceiro` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Transacao` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TransacaoInvestimento` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Conta" DROP CONSTRAINT "Conta_clienteId_fkey";

-- DropForeignKey
ALTER TABLE "Transacao" DROP CONSTRAINT "Transacao_contaId_fkey";

-- DropForeignKey
ALTER TABLE "TransacaoInvestimento" DROP CONSTRAINT "TransacaoInvestimento_conta_id_fkey";

-- DropForeignKey
ALTER TABLE "TransacaoInvestimento" DROP CONSTRAINT "TransacaoInvestimento_produto_financeiro_id_fkey";

-- DropTable
DROP TABLE "Cliente";

-- DropTable
DROP TABLE "Conta";

-- DropTable
DROP TABLE "ProdutoFinanceiro";

-- DropTable
DROP TABLE "Transacao";

-- DropTable
DROP TABLE "TransacaoInvestimento";

-- DropEnum
DROP TYPE "ContaTipo";

-- CreateTable
CREATE TABLE "cliente" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "data_nascimento" TEXT NOT NULL,
    "renda_estimada" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conta_corrente" (
    "id" SERIAL NOT NULL,
    "codigo" TEXT NOT NULL,
    "status_conta" "StatusConta" NOT NULL,
    "tipo_investidor" "InvestidorTipo",
    "clienteId" INTEGER NOT NULL,
    "limite" DOUBLE PRECISION,
    "saldo" DOUBLE PRECISION,
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_atualizacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "conta_corrente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transacao" (
    "id" SERIAL NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "tipo_transacao" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "evento_transacao" "EventoTransacao" NOT NULL,
    "conta_corrente_id" INTEGER NOT NULL,

    CONSTRAINT "transacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conta_investimento" (
    "id" SERIAL NOT NULL,
    "codigo" TEXT NOT NULL,
    "status_conta" "StatusConta" NOT NULL,
    "tipo_investidor" "InvestidorTipo",
    "clienteId" INTEGER NOT NULL,
    "limite" DOUBLE PRECISION,
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_atualizacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "conta_investimento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transacao_investimento" (
    "id" SERIAL NOT NULL,
    "data_transacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "quantidade" INTEGER NOT NULL,
    "resgatado" BOOLEAN NOT NULL DEFAULT false,
    "conta_investimento_id" INTEGER NOT NULL,
    "produto_financeiro_id" INTEGER NOT NULL,

    CONSTRAINT "transacao_investimento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "produto_financeiro" (
    "id" SERIAL NOT NULL,
    "preco_unitario" DOUBLE PRECISION NOT NULL,
    "data_resgate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "taxa_transacao" DOUBLE PRECISION NOT NULL,
    "emissor" TEXT NOT NULL,
    "quantidade_cotas" INTEGER NOT NULL,
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "risco" INTEGER NOT NULL,

    CONSTRAINT "produto_financeiro_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cliente_cpf_key" ON "cliente"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "conta_corrente_clienteId_key" ON "conta_corrente"("clienteId");

-- CreateIndex
CREATE UNIQUE INDEX "conta_investimento_clienteId_key" ON "conta_investimento"("clienteId");

-- AddForeignKey
ALTER TABLE "conta_corrente" ADD CONSTRAINT "conta_corrente_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transacao" ADD CONSTRAINT "transacao_conta_corrente_id_fkey" FOREIGN KEY ("conta_corrente_id") REFERENCES "conta_corrente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conta_investimento" ADD CONSTRAINT "conta_investimento_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transacao_investimento" ADD CONSTRAINT "transacao_investimento_conta_investimento_id_fkey" FOREIGN KEY ("conta_investimento_id") REFERENCES "conta_investimento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transacao_investimento" ADD CONSTRAINT "transacao_investimento_produto_financeiro_id_fkey" FOREIGN KEY ("produto_financeiro_id") REFERENCES "produto_financeiro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateEnum
CREATE TYPE "StatusConta" AS ENUM ('ATIVA', 'INATIVA', 'SUSPENSA', 'PENDENTE');

-- CreateEnum
CREATE TYPE "InvestidorTipo" AS ENUM ('NORMAL', 'QUALIFICADO');

-- CreateEnum
CREATE TYPE "ContaTipo" AS ENUM ('CORRENTE', 'CONTAINVESTIMENTO');

-- CreateEnum
CREATE TYPE "EventoTransacao" AS ENUM ('RESGATE_INVESTIMENTO', 'APLICACAO_INVESTIMENTO', 'DEPOSITO_CORRENTE', 'SAQUE_CORRENTE');

-- CreateTable
CREATE TABLE "Cliente" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "data_nascimento" TEXT NOT NULL,
    "renda_estimada" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Conta" (
    "id" SERIAL NOT NULL,
    "codigo" TEXT NOT NULL,
    "status_conta" "StatusConta" NOT NULL,
    "tipo" "ContaTipo" NOT NULL,
    "tipo_investidor" "InvestidorTipo",
    "clienteId" INTEGER NOT NULL,
    "limite" DOUBLE PRECISION,
    "saldo" DOUBLE PRECISION,
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_atualizacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Conta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transacao" (
    "id" SERIAL NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "tipo" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "evento_transacao" "EventoTransacao" NOT NULL,
    "contaId" INTEGER NOT NULL,

    CONSTRAINT "Transacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransacaoInvestimento" (
    "id" SERIAL NOT NULL,
    "data_transacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "quantidade" INTEGER NOT NULL,
    "resgatado" BOOLEAN NOT NULL,
    "conta_id" INTEGER NOT NULL,
    "produto_financeiro_id" INTEGER NOT NULL,

    CONSTRAINT "TransacaoInvestimento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProdutoFinanceiro" (
    "id" SERIAL NOT NULL,
    "preco_unitario" DOUBLE PRECISION NOT NULL,
    "data_resgate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "taxa_transacao" DOUBLE PRECISION NOT NULL,
    "emissor" TEXT NOT NULL,
    "quantidade_cotas" INTEGER NOT NULL,
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "risco" INTEGER NOT NULL,

    CONSTRAINT "ProdutoFinanceiro_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_cpf_key" ON "Cliente"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Conta_clienteId_key" ON "Conta"("clienteId");

-- AddForeignKey
ALTER TABLE "Conta" ADD CONSTRAINT "Conta_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transacao" ADD CONSTRAINT "Transacao_contaId_fkey" FOREIGN KEY ("contaId") REFERENCES "Conta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransacaoInvestimento" ADD CONSTRAINT "TransacaoInvestimento_conta_id_fkey" FOREIGN KEY ("conta_id") REFERENCES "Conta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransacaoInvestimento" ADD CONSTRAINT "TransacaoInvestimento_produto_financeiro_id_fkey" FOREIGN KEY ("produto_financeiro_id") REFERENCES "ProdutoFinanceiro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

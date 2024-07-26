import { prisma } from '../database/prisma-client';
import {
  Cliente,
  ContaCorrente,
  TipoTransacao,
  Transacao,
  TransacaoInvestimento,
} from '@prisma/client';
import { TransacaoInvestimentoCreate } from '../types';

class TransacaoRepository {
  async create(
    data: TransacaoInvestimentoCreate
  ): Promise<TransacaoInvestimento> {
    const result = await prisma.transacaoInvestimento.create({
      data: {
        quantidade: data.quantidade,
        conta_investimento_id: data.conta_investimento_id,
        produto_financeiro_id: data.produto_financeiro_id,
      },
    });
    return result;
  }

  async getTransacoes(
    conta_investimento_id: number,
    resgatado: boolean
  ): Promise<TransacaoInvestimento[]> {
    const result = await prisma.transacaoInvestimento.findMany({
      where: {
        conta_investimento_id,
        resgatado,
      },
      orderBy: {
        criado_em: 'desc',
      },
    });
    return result;
  }

  async countTransacoesByProdutoFinanceiro(
    produto_financeiro_id: number
  ): Promise<number> {
    const result = await prisma.transacaoInvestimento.count({
      where: {
        produto_financeiro_id,
      },
    });
    return result;
  }

  async getTransacoesNaoResgatadasByProdutoFinanceiro(
    produto_financeiro_ids: number[]
  ): Promise<TransacaoInvestimento[]> {
    const result = await prisma.transacaoInvestimento.findMany({
      where: {
        produto_financeiro_id: {
          in: produto_financeiro_ids,
        },
        resgatado: false,
      },
    });
    return result;
  }

  updateResgate = async (
    transacao_id: number
  ): Promise<TransacaoInvestimento> => {
    const result = await prisma.transacaoInvestimento.update({
      where: {
        id: transacao_id,
      },
      data: {
        resgatado: true,
      },
    });
    return result;
  };
}

export default TransacaoRepository;

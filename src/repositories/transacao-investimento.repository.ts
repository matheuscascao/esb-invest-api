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
    conta_investimento_id: number
  ): Promise<TransacaoInvestimento[]> {
    const result = await prisma.transacaoInvestimento.findMany({
      where: {
        conta_investimento_id,
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

  // async calculaValorAtualConta(conta_corrente_id: number): Promise<number> {
  //   const result = await prisma.transacao.aggregate({
  //     where: {
  //       conta_corrente_id,
  //     },
  //     _sum: {
  //       valor: true,
  //     },
  //   });
  //   console.log(result._sum.valor);
  //   return result._sum.valor || 0;
  // }
  // recebe conta_investimento_id e calcula valor total investido com base na quantidade de produtos financeiros, valor unitário, e taxa
}

export default TransacaoRepository;

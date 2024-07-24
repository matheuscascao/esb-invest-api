import { prisma } from '../database/prisma-client';
import {
  Cliente,
  ContaCorrente,
  TipoTransacao,
  Transacao,
} from '@prisma/client';
import { TransacaoCreate } from '../types';

class TransacaoRepository {
  async create(data: TransacaoCreate): Promise<Transacao> {
    const result = await prisma.transacao.create({
      data: {
        conta_corrente_id: data.conta_corrente_id,
        valor: data.valor,
        evento_transacao: data.evento_transacao,
        tipo_transacao: data.tipo_transacao as TipoTransacao,
      },
    });
    return result;
  }

  async findById(id: number): Promise<ContaCorrente | null> {
    const result = await prisma.contaCorrente.findFirst({
      where: {
        id,
      },
    });
    return result || null;
  }

  async calculaSaldo(conta_corrente_id: number): Promise<number> {
    const result = await prisma.transacao.aggregate({
      where: {
        conta_corrente_id,
      },
      _sum: {
        valor: true,
      },
    });
    console.log(result._sum.valor);
    return result._sum.valor || 0;
  }
}

export default TransacaoRepository;

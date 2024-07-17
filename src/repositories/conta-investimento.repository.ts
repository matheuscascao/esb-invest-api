import { prisma } from '../database/prisma-client';
import { ContaInvestimento } from '@prisma/client';

class ContaInvestimentoRepository {
  async create(
    data: Pick<ContaInvestimento, 'tipo_investidor' | 'cliente_id'>
  ): Promise<ContaInvestimento> {
    const result = await prisma.contaInvestimento.create({
      data: {
        tipo_investidor: data.tipo_investidor,
        cliente_id: data.cliente_id,
      },
    });
    return result;
  }
}

export default ContaInvestimentoRepository;

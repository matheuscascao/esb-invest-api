import { prisma } from '../database/prisma-client';
import { ContaInvestimento } from '@prisma/client';

class ContaInvestimentoRepository {
  async create(
    data: Pick<
      ContaInvestimento,
      'tipo_investidor' | 'cliente_id' | 'conta_corrente_id'
    >
  ): Promise<ContaInvestimento> {
    const result = await prisma.contaInvestimento.create({
      data: {
        tipo_investidor: data.tipo_investidor,
        cliente_id: data.cliente_id,
        conta_corrente_id: data.conta_corrente_id,
      },
    });
    return result;
  }

  async findById(id: number): Promise<ContaInvestimento | null> {
    const result = await prisma.contaInvestimento.findFirst({
      where: {
        id,
      },
    });
    return result || null;
  }

  async findMany(): Promise<ContaInvestimento[] | null> {
    const result = await prisma.contaInvestimento.findMany();
    return result;
  }
}

export default ContaInvestimentoRepository;

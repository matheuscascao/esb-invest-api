import { prisma } from '../database/prisma-client';
import { ContaCorrente } from '@prisma/client';

class ContaCorrenteRepository {
  async create(
    data: Omit<
      ContaCorrente,
      'id' | 'status_conta' | 'criado_em' | 'atualizado_em'
    >
  ): Promise<ContaCorrente> {
    const result = await prisma.contaCorrente.create({
      data: {
        cliente_id: data.cliente_id,
        limite: data.limite,
      },
    });
    return result;
  }
}

export default ContaCorrenteRepository;

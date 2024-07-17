import { prisma } from '../database/prisma-client';
import { ContaCorrente } from '@prisma/client';

// create a repository that implements the crud
// type ContaCorrente = {
//   id: number;
//   codigo: string;
//   status_conta: $Enums.StatusConta;
//   clienteId: number;
//   limite: number | null;
//   criado_em: Date;
//   atualizado_em: Date;
// }

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

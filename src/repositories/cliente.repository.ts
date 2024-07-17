import { prisma } from '../database/prisma-client';
import { Cliente } from '@prisma/client';

class ClienteRepository {
  async create(data: Omit<Cliente, 'id'>): Promise<Cliente> {
    const result = await prisma.cliente.create({
      data: {
        name: data.name,
        cpf: data.cpf,
        data_nascimento: data.data_nascimento,
        renda_estimada: data.renda_estimada,
      },
    });
    return result;
  }

  async findByCpf(cpf: string): Promise<Cliente | null> {
    const result = await prisma.cliente.findFirst({
      where: {
        cpf,
      },
    });
    return result || null;
  }
}

export { ClienteRepository };

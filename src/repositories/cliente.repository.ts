import { prisma } from '../database/prisma-client';
import { Cliente } from '@prisma/client';
import { ClienteCreate } from '../types';

class ClienteRepository {
  async create(data: ClienteCreate): Promise<Cliente> {
    const result = await prisma.cliente.create({
      data: {
        nome: data.nome,
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

  async findById(id: number): Promise<Cliente | null> {
    const result = await prisma.cliente.findUnique({
      where: {
        id,
      },
    });
    return result || null;
  }

  async findMany(): Promise<Cliente[] | null> {
    const result = await prisma.cliente.findMany();
    return result;
  }
}

export default ClienteRepository;

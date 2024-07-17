import { prisma } from '../database/prisma-client';
import {
  ICliente,
  IClienteRepository,
  IClienteCreate,
} from '../interfaces/cliente.interface';
import { Cliente } from '@prisma/client';

class ClienteRepository implements IClienteRepository {
  async create(data: Omit<Cliente, 'id'>): Promise<Cliente> {
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

  async findByCpf(cpf: string): Promise<ICliente | null> {
    const result = await prisma.cliente.findFirst({
      where: {
        cpf,
      },
    });
    return result || null;
  }
}

export { ClienteRepository };

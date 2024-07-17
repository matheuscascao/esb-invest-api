import { Cliente } from '@prisma/client';
import { ClienteRepository } from '../repositories/cliente.repository';

class ClienteService {
  private clienteReposity;

  constructor() {
    this.clienteReposity = new ClienteRepository();
  }

  public async create({
    name,
    cpf,
    data_nascimento,
    renda_estimada,
  }: Omit<Cliente, 'id'>): Promise<Cliente> {
    const verifyClientExists = await this.clienteReposity.findByCpf(cpf);
    if (verifyClientExists) {
      throw new Error('O cliente já existe');
    }
    const result = await this.clienteReposity.create({
      name,
      cpf,
      data_nascimento,
      renda_estimada,
    });

    return result;
  }
}

export { ClienteService };

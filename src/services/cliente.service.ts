import { Cliente } from '@prisma/client';
import { ClienteRepository } from '../repositories/cliente.repository';
import { ClienteCreate } from '../types';

class ClienteService {
  private clienteRepository;

  constructor() {
    this.clienteRepository = new ClienteRepository();
  }

  public async create({
    nome,
    cpf,
    data_nascimento,
    renda_estimada,
  }: ClienteCreate): Promise<Cliente> {
    const verifyClientExists = await this.clienteRepository.findByCpf(cpf);
    if (verifyClientExists) {
      throw new Error('O cliente já existe');
    }
    const result = await this.clienteRepository.create({
      nome,
      cpf,
      data_nascimento,
      renda_estimada,
    });
    return result;
  }

  public async findById(id: number): Promise<Cliente> {
    const result = await this.clienteRepository.findById(id);
    if (!result) {
      throw new Error('O cliente não existe');
    }
    return result;
  }

  public async findAll(): Promise<Cliente[] | null> {
    const result = await this.clienteRepository.findMany();
    return result;
  }
}

export { ClienteService };

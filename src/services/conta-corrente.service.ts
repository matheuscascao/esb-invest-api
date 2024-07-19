import ContaCorrenteRepository from '../repositories/conta-corrente.repository';
import { ContaCorrente } from '@prisma/client';

class ContaCorrenteService {
  private contaCorrenteRepository: ContaCorrenteRepository;
  constructor() {
    this.contaCorrenteRepository = new ContaCorrenteRepository();
  }

  public async create({
    cliente_id,
    limite,
  }: Pick<ContaCorrente, 'cliente_id' | 'limite'>): Promise<ContaCorrente> {
    const result = await this.contaCorrenteRepository.create({
      cliente_id,
      limite,
    });
    return result;
  }

  public async findById(id: number): Promise<ContaCorrente> {
    const result = await this.contaCorrenteRepository.findById(id);
    if (!result) {
      throw new Error('O cliente não existe');
    }
    return result;
  }

  public async findAll(): Promise<ContaCorrente[] | null> {
    const result = await this.contaCorrenteRepository.findMany();
    return result;
  }
}

export default ContaCorrenteService;

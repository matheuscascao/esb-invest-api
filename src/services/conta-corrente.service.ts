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
}

export default ContaCorrenteService;

import ContaInvestimentoRepository from '../repositories/conta-investimento.repository';
import { ContaInvestimento } from '@prisma/client';

class ContaInvestimentoService {
  private ContaInvestimentoRepository: ContaInvestimentoRepository;
  constructor() {
    this.ContaInvestimentoRepository = new ContaInvestimentoRepository();
  }

  public async create({
    cliente_id,
    tipo_investidor,
    conta_corrente_id,
  }: Pick<
    ContaInvestimento,
    'cliente_id' | 'tipo_investidor' | 'conta_corrente_id'
  >): Promise<ContaInvestimento> {
    const result = await this.ContaInvestimentoRepository.create({
      cliente_id,
      tipo_investidor,
      conta_corrente_id,
    });

    return result;
  }
}

export default ContaInvestimentoService;

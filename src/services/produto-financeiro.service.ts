import ProdutoFinanceiroRepository from '../repositories/produto-financeiro.repository';
import { ProdutoFinanceiro } from '@prisma/client';
import { ProdutoFinanceiroCreate } from '../types';

class ProdutoFinanceiroService {
  private ProdutoFinanceiroRepository: ProdutoFinanceiroRepository;
  constructor() {
    this.ProdutoFinanceiroRepository = new ProdutoFinanceiroRepository();
  }

  public async create(
    data: ProdutoFinanceiroCreate
  ): Promise<ProdutoFinanceiroCreate> {
    const result = await this.ProdutoFinanceiroRepository.create(data);

    return result;
  }
}

export default ProdutoFinanceiroService;

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

  public async findAll(): Promise<ProdutoFinanceiroCreate[] | null> {
    const result = await this.ProdutoFinanceiroRepository.findMany();
    return result;
  }

  public async findById(id: number): Promise<ProdutoFinanceiroCreate> {
    const result = await this.ProdutoFinanceiroRepository.findById(id);
    if (!result) {
      throw new Error('O cliente não existe');
    }
    return result;
  }
}

export default ProdutoFinanceiroService;

import { prisma } from '../database/prisma-client';
import { ProdutoFinanceiro } from '@prisma/client';
import { ProdutoFinanceiroCreate } from '../types';

class ProdutoFinanceiroRepository {
  async create(data: ProdutoFinanceiroCreate): Promise<ProdutoFinanceiro> {
    const result = await prisma.produtoFinanceiro.create({
      data: data,
    });
    return result;
  }
}

export default ProdutoFinanceiroRepository;

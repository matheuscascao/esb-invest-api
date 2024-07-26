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

  async findById(id: number): Promise<ProdutoFinanceiro | null> {
    const result = await prisma.produtoFinanceiro.findFirst({
      where: {
        id,
      },
    });
    return result || null;
  }

  async findByDataResgate(data_resgate: Date): Promise<ProdutoFinanceiro[]> {
    const result = await prisma.produtoFinanceiro.findMany({
      where: {
        data_resgate: {
          gte: new Date(
            data_resgate.getFullYear(),
            data_resgate.getMonth(),
            data_resgate.getDate(),
            0,
            0,
            0
          ),
          lt: new Date(
            data_resgate.getFullYear(),
            data_resgate.getMonth(),
            data_resgate.getDate() + 1,
            0,
            0,
            0
          ),
        },
      },
    });
    return result;
  }

  async findMany(): Promise<ProdutoFinanceiro[] | null> {
    const result = await prisma.produtoFinanceiro.findMany();
    return result;
  }
}

export default ProdutoFinanceiroRepository;

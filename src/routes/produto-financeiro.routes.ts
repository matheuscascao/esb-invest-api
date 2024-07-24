import ProdutoFinanceiroService from '../services/produto-financeiro.service';
import { InvestidorTipo } from '@prisma/client';
import { FastifyInstance } from 'fastify';
import { ProdutoFinanceiroCreate } from '../types';

export async function ProdutoFinanceiroRoutes(fastify: FastifyInstance) {
  const ProdutosFinanceirosService = new ProdutoFinanceiroService();

  fastify.post<{
    Body: ProdutoFinanceiroCreate;
  }>('/', async (req, reply) => {
    const body = req.body;
    try {
      const data = await ProdutosFinanceirosService.create(body);
      return reply.send(data);
    } catch (error) {
      reply.send(error);
    }
  });
}

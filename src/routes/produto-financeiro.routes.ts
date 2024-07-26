import ProdutoFinanceiroService from '../services/produto-financeiro.service';
import { FastifyInstance } from 'fastify';
import { ProdutoFinanceiroCreate } from '../types';

export async function ProdutoFinanceiroRoutes(fastify: FastifyInstance) {
  const produtosFinanceirosService = new ProdutoFinanceiroService();

  fastify.post<{
    Body: ProdutoFinanceiroCreate;
  }>('/', async (req, reply) => {
    const body = req.body;
    try {
      const data = await produtosFinanceirosService.create(body);
      return reply.send(data);
    } catch (error) {
      reply.send(error);
    }
  });

  fastify.get('/', async (req, reply) => {
    try {
      const data = await produtosFinanceirosService.findAll();
      return reply.send(data);
    } catch (error) {
      reply.send(error);
    }
  });

  fastify.get<{ Params: { id: string } }>('/:id', async (req, reply) => {
    const { id } = req.params;
    try {
      const data = await produtosFinanceirosService.findById(Number(id));
      return reply.send(data);
    } catch (error) {
      reply.send(error);
    }
  });
}

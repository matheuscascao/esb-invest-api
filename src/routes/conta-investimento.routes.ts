import ContaInvestimentoService from '../services/conta-investimento.service';
import { InvestidorTipo } from '@prisma/client';
import { FastifyInstance } from 'fastify';

export async function contaInvestimentoRoutes(fastify: FastifyInstance) {
  const contaInvestimentoService = new ContaInvestimentoService();

  fastify.post<{
    Body: { cliente_id: number; tipo_investidor: InvestidorTipo };
  }>('/', async (req, reply) => {
    const { cliente_id, tipo_investidor } = req.body;
    try {
      const data = await contaInvestimentoService.create({
        cliente_id,
        tipo_investidor,
      });
      return reply.send(data);
    } catch (error) {
      reply.send(error);
    }
  });
}

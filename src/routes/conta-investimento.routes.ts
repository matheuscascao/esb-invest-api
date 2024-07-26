import ContaInvestimentoService from '../services/conta-investimento.service';
import { InvestidorTipo } from '@prisma/client';

import { FastifyInstance } from 'fastify';

export async function contaInvestimentoRoutes(fastify: FastifyInstance) {
  const contaInvestimentoService = new ContaInvestimentoService();

  fastify.post<{
    Body: {
      cliente_id: number;
      tipo_investidor: InvestidorTipo;
      conta_corrente_id: number;
    };
  }>('/', async (req, reply) => {
    const { cliente_id, tipo_investidor, conta_corrente_id } = req.body;
    try {
      const data = await contaInvestimentoService.create({
        cliente_id,
        tipo_investidor,
        conta_corrente_id,
      });
      return reply.send(data);
    } catch (error) {
      reply.send(error);
    }
  });

  fastify.post<{
    Body: {
      conta_investimento_id: number;
      produto_financeiro_id: number;
      quantidade: number;
    };
  }>('/aplica-investimento', async (req, reply) => {
    const { conta_investimento_id, produto_financeiro_id, quantidade } =
      req.body;
    try {
      await contaInvestimentoService.aplicaInvestimento({
        conta_investimento_id,
        produto_financeiro_id,
        quantidade,
      });
      return reply.send('Investimento aplicado com sucesso');
    } catch (error) {
      reply.send(error);
    }
  });
}

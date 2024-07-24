import ContaCorrenteService from '../services/conta-corrente.service';
import { FastifyInstance } from 'fastify';

export async function contaCorrenteRoutes(fastify: FastifyInstance) {
  const contaCorrenteService = new ContaCorrenteService();

  fastify.post<{ Body: { cliente_id: number; limite: number } }>(
    '/',
    async (req, reply) => {
      const { cliente_id, limite } = req.body;
      try {
        const data = await contaCorrenteService.create({
          cliente_id,
          limite,
        });
        return reply.send(data);
      } catch (error) {
        reply.send(error);
      }
    }
  );

  fastify.get<{ Params: { id: string } }>('/:id', async (req, reply) => {
    const { id } = req.params;
    try {
      const data = await contaCorrenteService.findById(Number(id));
      return reply.send(data);
    } catch (error) {
      reply.send(error);
    }
  });

  fastify.get('/', async (req, reply) => {
    try {
      const data = await contaCorrenteService.findAll();
      return reply.send(data);
    } catch (error) {
      reply.send(error);
    }
  });

  fastify.post<{
    Params: { conta_corrente_id: number };
  }>('/:conta_corrente_id/transacoes', async (req, reply) => {
    const { conta_corrente_id } = req.params;
    try {
      const data = await contaCorrenteService.getTransacoes(
        Number(conta_corrente_id)
      );
      return reply.send(data);
    } catch (error) {
      reply.send(error);
    }
  });
}

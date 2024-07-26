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
  //getindex
  fastify.get<{ Params: { id: string } }>('/:id', async (req, reply) => {
    const { id } = req.params;
    try {
      const data = await contaCorrenteService.findById(Number(id));
      return reply.send(data);
    } catch (error) {
      reply.send(error);
    }
  });
  //getall
  fastify.get('/', async (req, reply) => {
    try {
      const data = await contaCorrenteService.findAll();
      return reply.send(data);
    } catch (error) {
      reply.send(error);
    }
  });
  //get transacoes
  fastify.get<{
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

  fastify.post<{
    Body: {
      contaOrigemId: number;
      contaDestinoId: number;
      valor: number;
    };
  }>('/transferir', async (req, reply) => {
    const { contaOrigemId, contaDestinoId, valor } = req.body;
    try {
      await contaCorrenteService.transferirFundos({
        contaOrigemId,
        contaDestinoId,
        valor,
      });
      return reply.send({ message: 'Transfer completed successfully' });
    } catch (error) {
      const err = error as Error;
      reply.code(500).send({ error: err.message });
    }
  });
}

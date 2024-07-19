import { FastifyInstance } from 'fastify';
import TransacaoService from '../services/transacao.service';
import { TransacaoCreate } from '../types';

export async function transacoesRoutes(fastify: FastifyInstance) {
  const transacaoService = new TransacaoService();

  fastify.post<{
    Body: TransacaoCreate;
  }>('/', async (req, reply) => {
    const { conta_corrente_id, valor, evento_transacao } = req.body;
    try {
      const data = await transacaoService.create({
        conta_corrente_id,
        valor,
        evento_transacao,
      });
      return reply.send(data);
    } catch (error) {
      reply.send(error);
    }
  });
}

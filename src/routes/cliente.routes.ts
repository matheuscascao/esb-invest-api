import { FastifyInstance } from 'fastify';
import { ClienteCreate } from '../types';
import ClienteService from '../services/cliente.service';

export async function clienteRoutes(fastify: FastifyInstance) {
  const clienteService = new ClienteService();

  //store = create
  fastify.post<{ Body: ClienteCreate }>('/', async (req, reply) => {
    const { nome, cpf, data_nascimento, renda_estimada } = req.body;
    try {
      const data = await clienteService.create({
        nome,
        cpf,
        data_nascimento,
        renda_estimada,
      });
      return reply.send(data);
    } catch (error) {
      reply.send(error);
    }
  });

  fastify.get<{ Params: { id: string } }>('/:id', async (req, reply) => {
    const { id } = req.params;
    try {
      const data = await clienteService.findById(Number(id));
      return reply.send(data);
    } catch (error) {
      reply.send(error);
    }
  });

  fastify.get('/', async (req, reply) => {
    try {
      const data = await clienteService.findAll();
      return reply.send(data);
    } catch (error) {
      reply.send(error);
    }
  });
}

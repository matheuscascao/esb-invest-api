import { FastifyInstance } from 'fastify';
import { ClienteService } from '../services/cliente.service';
import { IClienteCreate } from '../interfaces/cliente.interface';

export async function clienteRoutes(fastify: FastifyInstance) {
  const clienteService = new ClienteService();

  //store = create
  fastify.post<{ Body: IClienteCreate }>('/store', (req, reply) => {
    const { name, cpf, data_nascimento, renda_estimada } = req.body;
    try {
      const data = clienteService.create({
        name,
        cpf,
        data_nascimento,
        renda_estimada,
      });
      return reply.send(data);
    } catch (error) {
      reply.send(error);
    }
  });

  fastify.get('/', (req, reply) => {
    reply.send({ hello: 'world' });
  });
}

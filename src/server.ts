import fastify, { FastifyInstance } from 'fastify';
import { clienteRoutes } from './routes/cliente.routes';
import { contaCorrenteRoutes } from './routes/conta-corrente.routes';
const app: FastifyInstance = fastify({ logger: true });

app.register(clienteRoutes, {
  prefix: '/clientes',
});
app.register(contaCorrenteRoutes, {
  prefix: '/contas-correntes',
});

app.listen(
  {
    port: 3100,
  },
  () => console.log('Server is running on port 3100')
);

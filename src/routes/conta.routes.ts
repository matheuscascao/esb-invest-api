// import { createConta } from '../services/conta.service';

// // id                     Int                     @id @default(autoincrement())
// // codigo                 String
// // status_conta           StatusConta
// // tipo_conta             ContaTipo
// // tipo_investidor        InvestidorTipo?
// // cliente                Cliente                 @relation(fields: [clienteId], references: [id])
// // clienteId              Int                     @unique
// // transacoes             Transacao[]
// // transacoesInvestimento TransacaoInvestimento[]
// // limite                 Float?
// // saldo                  Float?
// // data_criacao           DateTime                @default(now())
// // data_atualizacao       DateTime                @updatedAt

// export const contaRoutes = async (fastify) => {
//   fastify.post('/store', async (req, reply) => {
//     const { cliente_id, saldo, limite, tipo } = req.body;
//     try {
//       const data = await createConta({
//         codigo
//       });
//       return reply.send(data);
//     } catch (error) {
//       reply.send(error);
//     }
//   });
// };

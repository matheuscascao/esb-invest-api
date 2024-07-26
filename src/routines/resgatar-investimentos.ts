import cron from 'node-cron';
import ContaInvestimentoService from '../services/conta-investimento.service';

const service = new ContaInvestimentoService();

export const startResgateInvestimentoCronJob = () => {
  cron.schedule('* * * * *', async () => {
    try {
      const transacoesCount = await service.resgataInvestimento();
      console.log(`Resgatados ${transacoesCount} investimentos`);
    } catch (error) {
      console.error('Error executing resgatarInvestimentos:', error);
    }
  });
  console.log('Cron job started');
};

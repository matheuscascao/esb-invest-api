import { TipoTransacao, Transacao } from '@prisma/client';
import TransacaoRepository from '../repositories/transacao.repository';
import { TransacaoCreate } from '../types';

class TransacaoService {
  private transacaoRepository;

  constructor() {
    this.transacaoRepository = new TransacaoRepository();
  }

  public async create({
    conta_corrente_id,
    valor,
    evento_transacao,
  }: TransacaoCreate): Promise<Transacao> {
    const verifyAccountExists = await this.transacaoRepository.findById(
      conta_corrente_id
    );
    if (!verifyAccountExists) {
      throw new Error('A conta não existe');
    }

    let tipo_transacao: TipoTransacao;

    if (valor > 0) {
      tipo_transacao = TipoTransacao.ENTRADA;
    } else {
      tipo_transacao = TipoTransacao.SAIDA;
    }

    const result = await this.transacaoRepository.create({
      conta_corrente_id,
      valor,
      evento_transacao,
      tipo_transacao,
    });
    return result;
  }
}

export default TransacaoService;

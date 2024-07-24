import { TipoTransacao, Transacao, ContaCorrente } from '@prisma/client';
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
    const contaCorrente = await this.transacaoRepository.findById(
      conta_corrente_id
    );
    if (!contaCorrente) throw new Error('A conta não existe');

    const isTransacaoValidaLimite = await this.validaTransacaoLimite(
      valor,
      contaCorrente
    );
    if (!isTransacaoValidaLimite) throw new Error('Transação inválida');

    let tipo_transacao = this.getTipoTransacao(valor);

    const result = await this.transacaoRepository.create({
      conta_corrente_id,
      valor,
      evento_transacao,
      tipo_transacao,
    });
    return result;
  }

  private getTipoTransacao(valor: number): TipoTransacao {
    return valor > 0 ? TipoTransacao.ENTRADA : TipoTransacao.SAIDA;
  }

  private async validaTransacaoLimite(
    valor: number,
    conta: ContaCorrente
  ): Promise<boolean> {
    const saldo = await this.transacaoRepository.calculaSaldo(conta.id);
    const limite = conta.limite;

    if (saldo + valor <= limite) {
      return true;
    }
    return false;
  }
}

export default TransacaoService;

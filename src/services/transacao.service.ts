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

    let tipo_transacao = this.getTipoTransacao(valor);
    const isTransacaoValidaLimite = await this.validaTransacaoLimite(
      valor,
      contaCorrente,
      tipo_transacao
    );
    if (!isTransacaoValidaLimite) throw new Error('Transação  por limite');

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
    conta: ContaCorrente,
    tipo_transacao: TipoTransacao
  ): Promise<boolean> {
    if (tipo_transacao === TipoTransacao.ENTRADA) return true;

    const saldo = await this.transacaoRepository.calculaSaldo(conta.id);
    const limite = conta.limite;

    console.log(saldo, -limite);

    if (saldo - valor <= -limite) {
      return false;
    }
    return true;
  }
}

export default TransacaoService;
